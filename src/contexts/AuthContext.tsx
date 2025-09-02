import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: any | null;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signUpWithPhone: (phone: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithPhone: (phone: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  verifyOTP: (phone: string, token: string) => Promise<void>;
  resendOTP: (phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile when session changes
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const redirectUrl = `${window.location.origin}/auth?verified=true`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account before signing in.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUpWithPhone = async (phone: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        phone,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Verification code sent!",
        description: "Please check your phone for a verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if email is verified
      if (data.user && !data.user.email_confirmed_at) {
        await supabase.auth.signOut();
        throw new Error("Please verify your email before signing in. Check your inbox for a verification link.");
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithPhone = async (phone: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password,
      });

      if (error) throw error;

      // Check if phone is verified
      if (data.user && !data.user.phone_confirmed_at) {
        await supabase.auth.signOut();
        throw new Error("Please verify your phone number before signing in. Check your SMS for a verification code.");
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      toast({
        title: "Redirecting to Google",
        description: "Please complete the sign in process with Google.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyOTP = async (phone: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms'
      });

      if (error) throw error;

      toast({
        title: "Phone verified!",
        description: "You have successfully verified your phone number.",
      });
    } catch (error: any) {
      let errorMessage = error.message;
      
      if (error.message?.includes('invalid') || error.message?.includes('expired')) {
        errorMessage = "Invalid or expired verification code. Please try again.";
      } else if (error.message?.includes('too_many_requests')) {
        errorMessage = "Too many attempts. Please wait a few minutes before trying again.";
      }

      toast({
        title: "Verification failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const resendOTP = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (error) throw error;

      toast({
        title: "Code sent!",
        description: "A new verification code has been sent to your phone.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const isAdmin = () => {
    return userProfile?.role === 'admin';
  };

  const value = {
    user,
    session,
    loading,
    userProfile,
    signUp,
    signUpWithPhone,
    signIn,
    signInWithPhone,
    signInWithGoogle,
    verifyOTP,
    resendOTP,
    signOut,
    resetPassword,
    changePassword,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};