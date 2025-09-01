import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  orderId: string;
  amount: number;
  phone: string;
  provider: 'mtn_momo' | 'telecel_cash';
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { orderId, amount, phone, provider }: PaymentRequest = await req.json();
    
    console.log(`Processing payment request for Order: ${orderId}, Amount: ${amount}, Provider: ${provider}`);

    // Get payment receiver details (server-side only)
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: receiverData, error: receiverError } = await supabaseService
      .from('payment_receivers')
      .select('*')
      .eq('provider', provider)
      .eq('is_active', true)
      .single();

    if (receiverError || !receiverData) {
      throw new Error("Payment receiver not found");
    }

    // Create payment record with pending status
    const paymentReference = `PAY-${Date.now()}-${orderId.slice(0, 8)}`;
    
    const { error: paymentError } = await supabaseService
      .from('payments')
      .insert({
        order_id: orderId,
        amount: amount,
        currency: 'GHS',
        provider: provider,
        provider_txn_id: paymentReference,
        status: 'pending',
        payment_method: provider === 'mtn_momo' ? 'MTN Mobile Money' : 'Telecel Cash',
        metadata: {
          customer_phone: phone,
          receiver_masked: receiverData.masked_number,
          initiated_at: new Date().toISOString()
        }
      });

    if (paymentError) {
      throw new Error("Failed to create payment record");
    }

    // Update order status to payment_pending
    const { error: orderError } = await supabaseService
      .from('orders')
      .update({
        status: 'payment_pending',
        payment_provider: provider,
        payment_reference: paymentReference
      })
      .eq('id', orderId);

    if (orderError) {
      throw new Error("Failed to update order status");
    }

    // Send notification to user
    await supabaseService.rpc('send_notification', {
      target_user_id: user.id,
      notification_title: 'Payment Initiated',
      notification_message: `Your payment of GH₵ ${amount} has been initiated. Please complete the payment on your phone.`,
      notification_type: 'info'
    });

    // For now, return payment instructions since we don't have direct API integration
    // In production, this would integrate with MTN/Telecel APIs
    return new Response(JSON.stringify({
      success: true,
      paymentReference,
      instructions: {
        message: "Payment initiated successfully",
        steps: [
          `Dial *${provider === 'mtn_momo' ? '170' : '181'}# on your ${provider === 'mtn_momo' ? 'MTN' : 'Telecel'} phone`,
          "Select 'Transfer Money' or 'Send Money'",
          `Send GH₵ ${amount} to ${receiverData.masked_number}`,
          "Use payment reference: " + paymentReference,
          "Your order will be confirmed once payment is received"
        ],
        amount,
        receiver: receiverData.masked_number,
        reference: paymentReference
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});