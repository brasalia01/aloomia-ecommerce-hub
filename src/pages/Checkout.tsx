import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/components/ui/back-button';

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'momo'
  });

  // Mock cart items - in real app this would come from context/state
  const cartItems = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, quantity: 1 },
    { id: 2, name: 'Smart Watch Pro', price: 399.99, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 25.00;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Process payment with Flutterwave/Paystack
    alert('Payment processing would happen here. Connect to Supabase to implement actual payment processing.');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <BackButton className="mb-6">Back to Cart</BackButton>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Checkout Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Delivery Information</h3>
                    
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        required
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Special delivery instructions, preferred delivery time, etc."
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <input
                          type="radio"
                          id="momo"
                          name="payment"
                          value="momo"
                          checked={formData.paymentMethod === 'momo'}
                          onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        />
                        <Smartphone className="w-5 h-5 text-primary" />
                        <Label htmlFor="momo" className="flex-1">
                          <div>
                            <p className="font-medium">Mobile Money</p>
                            <p className="text-sm text-muted-foreground">Pay with MTN, Vodafone, or AirtelTigo</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                        <input
                          type="radio"
                          id="card"
                          name="payment"
                          value="card"
                          disabled
                        />
                        <CreditCard className="w-5 h-5" />
                        <Label htmlFor="card" className="flex-1">
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-muted-foreground">Coming soon</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Place Order - GH₵ {total.toFixed(2)}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">GH₵ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>GH₵ {subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery Fee</p>
                    <p>GH₵ {deliveryFee.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>GH₵ {total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Payment will be processed securely through our mobile money partner.
                    You will receive an SMS with payment instructions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}