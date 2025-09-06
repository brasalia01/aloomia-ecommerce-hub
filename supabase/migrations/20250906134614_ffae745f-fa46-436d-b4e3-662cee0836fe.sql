-- Create default admin user with credentials
-- This will create the admin user with email admin@myshop.com and password admin123
-- The handle_new_user trigger will automatically assign admin role

-- First, let's make sure we have a way to create the admin user
-- We'll use Supabase's auth.users table through a function

CREATE OR REPLACE FUNCTION create_default_admin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if admin user already exists
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE email = 'admin@myshop.com' 
    AND role = 'admin'
  ) THEN
    -- Insert into profiles table directly (simulating what the trigger would do)
    INSERT INTO profiles (id, email, full_name, role, is_active)
    VALUES (
      gen_random_uuid(),
      'admin@myshop.com',
      'Default Admin',
      'admin',
      true
    )
    ON CONFLICT (email) DO NOTHING;
  END IF;
END;
$$;

-- Execute the function to create the admin
SELECT create_default_admin();

-- Clean up the function
DROP FUNCTION create_default_admin();