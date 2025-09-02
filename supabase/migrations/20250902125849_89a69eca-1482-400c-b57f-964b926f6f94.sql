-- Add unique constraints and phone column to profiles table
-- First add the phone column if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;

-- Add unique constraints to prevent duplicate emails and phone numbers
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique ON public.profiles (email) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_phone_unique ON public.profiles (phone) WHERE phone IS NOT NULL;

-- Update the handle_new_user function to include phone number from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'auth', 'pg_temp'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, phone, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE 
      WHEN NEW.email = 'admin@myshop.com' THEN 'admin'::user_role
      ELSE 'customer'::user_role
    END
  );
  RETURN NEW;
END;
$$;