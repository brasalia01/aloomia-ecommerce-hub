-- ============================================
-- SECURITY FIX: Strengthen RLS policies on profiles table
-- Issue: Customer Email Addresses and Phone Numbers Could Be Stolen
-- ============================================

-- Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create strict, explicit RLS policies that prevent data enumeration

-- Policy 1: Users can ONLY view their own profile (explicit restriction)
CREATE POLICY "users_select_own_profile_only"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy 2: Users can ONLY update their own profile (explicit restriction)
CREATE POLICY "users_update_own_profile_only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy 3: Only admins can view all profiles
CREATE POLICY "admins_select_all_profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Policy 4: Only admins can insert profiles (handle_new_user function uses service role)
CREATE POLICY "admins_insert_profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Policy 5: Only admins can delete profiles
CREATE POLICY "admins_delete_profiles"
ON public.profiles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Policy 6: Admins can update any profile
CREATE POLICY "admins_update_all_profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Verify RLS is enabled (should already be enabled, but being explicit)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add comment documenting the security model
COMMENT ON TABLE public.profiles IS 'User profiles with strict RLS: Users can only access their own profile, admins can access all profiles. Protects against data enumeration and bulk extraction attacks.';