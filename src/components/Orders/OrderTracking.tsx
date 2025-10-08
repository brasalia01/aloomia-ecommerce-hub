import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';

interface OrderTrackingProps {
  orderId: string;
}

interface OrderStatus {
  status: string;
  placed_at: string;
  updated_at: string;
  shipping_address: any;
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Clock },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export const OrderTracking = ({ orderId }: OrderTrackingProps) => {
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
    
    // Subscribe to order updates
    const channel = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrder(payload.new as OrderStatus);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('status, placed_at, updated_at, shipping_address')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading order status...</div>;
  }

  if (!order) {
    return <div className="text-center py-8">Order not found</div>;
  }

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);
  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Order Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {new Date(order.updated_at).toLocaleString()}
            </p>
          </div>
          <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="text-sm">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <Progress value={progress} className="mb-8" />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-8">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.key} className="relative flex items-start gap-4">
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                      isCompleted
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-background border-border text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <h4
                      className={`font-semibold ${
                        isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Your order is currently being {step.label.toLowerCase()}
                      </p>
                    )}
                    {isCompleted && index < currentStepIndex && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Completed
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {order.shipping_address && (
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2">Delivery Address</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{order.shipping_address.full_name}</p>
                <p>{order.shipping_address.address}</p>
                <p>{order.shipping_address.phone}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-muted/50">
        <h4 className="font-semibold mb-3">Estimated Delivery</h4>
        <p className="text-muted-foreground">
          {order.status === 'delivered' ? (
            'Your order has been delivered!'
          ) : order.status === 'shipped' ? (
            'Expected delivery in 2-3 business days'
          ) : order.status === 'processing' ? (
            'Your order will ship within 1-2 business days'
          ) : (
            'Processing time: 1-2 business days'
          )}
        </p>
      </Card>
    </div>
  );
};