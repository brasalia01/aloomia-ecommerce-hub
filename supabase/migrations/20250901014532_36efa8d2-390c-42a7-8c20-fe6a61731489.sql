-- Update profiles table to add role field and payment settings
-- Add role enum if not exists
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'customer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add role column to profiles if not exists
DO $$ BEGIN
    ALTER TABLE profiles ADD COLUMN role user_role DEFAULT 'customer'::user_role;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Create payment_receivers table for secure storage of Mobile Money details
CREATE TABLE IF NOT EXISTS payment_receivers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  provider text NOT NULL, -- 'mtn_momo', 'telecel_cash'
  full_number text NOT NULL, -- stored securely, server-side only
  masked_number text NOT NULL, -- for display purposes: "053****3683"
  account_name text NOT NULL,
  is_active boolean DEFAULT true,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on payment_receivers
ALTER TABLE payment_receivers ENABLE ROW LEVEL SECURITY;

-- Only admins can access payment_receivers
CREATE POLICY "Admins can manage payment receivers" ON payment_receivers
  FOR ALL USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- Add payment-related fields to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_provider text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_reference text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_metadata jsonb DEFAULT '{}';

-- Update order status enum to include payment statuses
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'payment_pending';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'payment_failed';

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can create notifications for any user
CREATE POLICY "Admins can create notifications" ON notifications
  FOR INSERT WITH CHECK (get_user_role(auth.uid()) = 'admin'::user_role);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert the Mobile Money receiver details securely
INSERT INTO payment_receivers (provider, full_number, masked_number, account_name) 
VALUES ('mtn_momo', '0538163683', '053****3683', 'ABDALLAH SALIA')
ON CONFLICT DO NOTHING;

-- Update admin user (replace with actual admin email)
UPDATE profiles SET role = 'admin'::user_role WHERE email = 'admin@myshop.com';

-- Create function to send notification
CREATE OR REPLACE FUNCTION send_notification(
  target_user_id uuid,
  notification_title text,
  notification_message text,
  notification_type text DEFAULT 'info'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (user_id, title, message, type)
  VALUES (target_user_id, notification_title, notification_message, notification_type)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;