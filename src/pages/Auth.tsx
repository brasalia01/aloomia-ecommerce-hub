import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, LogIn, UserPlus, Phone, Timer, RefreshCw } from 'lucide-react';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState('email');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    signIn, 
    signUp, 
    signInWithPhone, 
    signUpWithPhone, 
    signInWithGoogle, 
    verifyOTP, 
    resendOTP,
    user 
  } = useAuth();
  const { toast } = useToast();

  const [signInData, setSignInData] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    phone: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  const [otpData, setOtpData] = useState({
    phone: '',
    code: ''
  });

  const from = location.state?.from?.pathname || '/';

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOTP(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const startOTPTimer = () => {
    setOtpTimer(300); // 5 minutes = 300 seconds
    setCanResendOTP(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMethod === 'email') {
        await signIn(signInData.email, signInData.password);
      } else {
        await signInWithPhone(signInData.phone, signInData.password);
      }
      navigate(from, { replace: true });
    } catch (error: any) {
      // Error handled in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (authMethod === 'email') {
        await signUp(signUpData.email, signUpData.password, signUpData.fullName);
      } else {
        // Validate phone number format
        if (!signUpData.phone.match(/^\+?[\d\s\-\(\)]+$/)) {
          throw new Error("Please enter a valid phone number with country code (e.g., +1234567890)");
        }
        
        await signUpWithPhone(signUpData.phone, signUpData.password, signUpData.fullName);
        setOtpData(prev => ({ ...prev, phone: signUpData.phone }));
        setShowOTPInput(true);
        startOTPTimer();
      }
    } catch (error: any) {
      // Error handled in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await verifyOTP(otpData.phone, otpData.code);
      setShowOTPInput(false);
      navigate(from, { replace: true });
    } catch (error: any) {
      // Error handled in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await resendOTP(otpData.phone);
      startOTPTimer();
    } catch (error: any) {
      // Error handled in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      // Error handled in context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4"
            >
              <User className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome
            </CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {showOTPInput ? (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Verify your phone</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter the verification code sent to{' '}
                      <span className="font-medium text-foreground">{otpData.phone}</span>
                    </p>
                  </div>
                  
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp-code">Verification Code</Label>
                      <Input
                        id="otp-code"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otpData.code}
                        onChange={(e) => setOtpData(prev => ({ ...prev, code: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                        required
                        maxLength={6}
                        className="text-center text-lg tracking-widest"
                      />
                    </div>

                    {otpTimer > 0 && (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Timer className="w-4 h-4" />
                        <span>Code expires in {formatTime(otpTimer)}</span>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading || otpData.code.length !== 6}
                    >
                      {isLoading ? "Verifying..." : "Verify Code"}
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setShowOTPInput(false);
                          setOtpTimer(0);
                          setCanResendOTP(false);
                        }}
                      >
                        Back
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex-1"
                        onClick={handleResendOTP}
                        disabled={isLoading || !canResendOTP}
                      >
                        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Resend
                      </Button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signin" className="flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger value="signup" className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Sign Up
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin" className="space-y-4 mt-6">
                      {/* Google Sign In */}
                      <Button 
                        onClick={handleGoogleSignIn}
                        variant="outline" 
                        className="w-full h-12 text-base font-medium"
                        disabled={isLoading}
                      >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>

                      {/* Email/Phone Toggle */}
                      <Tabs value={authMethod} onValueChange={setAuthMethod} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </TabsTrigger>
                          <TabsTrigger value="phone" className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                        {authMethod === 'email' ? (
                          <div className="space-y-2">
                            <Label htmlFor="signin-email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="signin-email"
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                value={signInData.email}
                                onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                                required
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="signin-phone">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="signin-phone"
                                type="tel"
                                placeholder="+1234567890"
                                className="pl-10"
                                value={signInData.phone}
                                onChange={(e) => setSignInData(prev => ({ ...prev, phone: e.target.value }))}
                                required
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Include country code (e.g., +1 for US, +44 for UK)
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="signin-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signin-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="pl-10 pr-10"
                              value={signInData.password}
                              onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4 mt-6">
                      {/* Google Sign In */}
                      <Button 
                        onClick={handleGoogleSignIn}
                        variant="outline" 
                        className="w-full h-12 text-base font-medium"
                        disabled={isLoading}
                      >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>

                      {/* Email/Phone Toggle */}
                      <Tabs value={authMethod} onValueChange={setAuthMethod} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </TabsTrigger>
                          <TabsTrigger value="phone" className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="Enter your full name"
                              className="pl-10"
                              value={signUpData.fullName}
                              onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                              required
                            />
                          </div>
                        </div>

                        {authMethod === 'email' ? (
                          <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="signup-email"
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                value={signUpData.email}
                                onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                                required
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="signup-phone">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="signup-phone"
                                type="tel"
                                placeholder="+1234567890"
                                className="pl-10"
                                value={signUpData.phone}
                                onChange={(e) => setSignUpData(prev => ({ ...prev, phone: e.target.value }))}
                                required
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Include country code (e.g., +1 for US, +44 for UK)
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password (min. 6 characters)"
                              className="pl-10 pr-10"
                              value={signUpData.password}
                              onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                              required
                              minLength={6}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-confirm">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-confirm"
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="pl-10"
                              value={signUpData.confirmPassword}
                              onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              required
                              minLength={6}
                            />
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating account..." : 
                           authMethod === 'phone' ? "Send Verification Code" : "Create Account"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;