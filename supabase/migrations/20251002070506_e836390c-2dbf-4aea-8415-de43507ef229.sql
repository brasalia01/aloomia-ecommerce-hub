-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Admin can manage all subscribers
CREATE POLICY "Admins can manage newsletter subscribers"
ON public.newsletter_subscribers
FOR ALL
TO authenticated
USING (get_user_role(auth.uid()) = 'admin');

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO anon
WITH CHECK (true);

-- Add updated_at trigger
CREATE TRIGGER update_newsletter_subscribers_updated_at
BEFORE UPDATE ON public.newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_subscribers;