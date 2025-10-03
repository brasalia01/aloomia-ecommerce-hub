-- Ensure RLS is enabled on profiles table
-- This prevents any unauthenticated access by default
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add SELECT policy for order_items so users can view their own order items
-- This complements the existing INSERT policy for users
CREATE POLICY "Users can view their own order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.orders
    WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
  )
);