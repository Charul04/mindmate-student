import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Brain, Trash2, Eye, EyeOff, Info, Chrome, Apple as AppleIcon, Facebook } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import TermsPrivacyDialog from '@/components/TermsPrivacyDialog';
import { supabase } from '@/integrations/supabase/client';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsDialogTab, setTermsDialogTab] = useState<"terms" | "privacy">("terms");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  
  const navigate = useNavigate();
  const { user, session, signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Clean up chatbot when on auth page and prevent it from appearing
  useEffect(() => {
    const cleanupChatbot = () => {
      // Remove all chatbot related elements
      const elementsToRemove = [
        '#chatbase-bubble-window',
        '#chatbase-message-bubbles', 
        '.chatbase-bubble-button',
        '#Sl0q4y9ILFqIdK8szW1Gv',
        '#chatbase-init',
        '[data-chatbase-embed]'
      ];
      
      elementsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => element.remove());
      });
      
      // Clear window chatbase
      if (window.chatbase) {
        window.chatbase = undefined;
      }
    };

    // Initial cleanup
    cleanupChatbot();
    
    // Set up interval to continuously clean up chatbot
    const interval = setInterval(cleanupChatbot, 500);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempted', { email });
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Sign in error:', error);
        setError(error.message);
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log('Sign in successful');
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate('/');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up attempted', { email });
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        console.error('Sign up error:', error);
        setError(error.message);
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log('Sign up successful');
        toast({
          title: "Account Created!",
          description: "Please check your email for a confirmation link.",
        });
        // Clear form
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setActiveTab('signin');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Social login error:', error);
        setError(error.message);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestAccess = () => {
    toast({
      title: "Guest Access",
      description: "Continuing as guest. Note: Your data won't be saved.",
    });
    navigate('/');
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`
      });

      if (error) {
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Reset Email Sent",
          description: "Check your email for the password reset link.",
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteEmail || !deletePassword) {
      setError('Please enter email and password to delete account');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First, verify credentials by signing in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: deleteEmail,
        password: deletePassword,
      });

      if (signInError) {
        setError('Invalid email or password');
        toast({
          title: "Authentication Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Get current session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (!currentSession?.user?.id) {
        setError('No active session found');
        setIsLoading(false);
        return;
      }

      // Call the edge function to delete user and all data
      const { data, error: functionError } = await supabase.functions.invoke('delete-user', {
        body: { userId: currentSession.user.id }
      });

      if (functionError) {
        console.error('Delete function error:', functionError);
        setError(functionError.message || 'Failed to delete account');
        toast({
          title: "Account Deletion Failed",
          description: functionError.message || 'Failed to delete account',
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Deleted",
          description: "Your account and all data have been permanently deleted.",
        });
        setShowDeleteConfirm(false);
        setDeleteEmail('');
        setDeletePassword('');
        
        // Sign out after successful deletion
        await supabase.auth.signOut();
        navigate('/auth');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">MindMate</h1>
          </div>
          <p className="text-gray-600">
            {activeTab === 'signin' ? 'Welcome back!' : 'Start your wellness journey'}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-center">
              {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full font-bold text-base h-11 shadow-lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                      className="h-11"
                    >
                      <Chrome className="w-5 h-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('apple')}
                      disabled={isLoading}
                      className="h-11"
                    >
                      <AppleIcon className="w-5 h-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('facebook')}
                      disabled={isLoading}
                      className="h-11"
                    >
                      <Facebook className="w-5 h-5" />
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleGuestAccess}
                    className="w-full"
                  >
                    Continue as Guest
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full font-bold text-base h-11 shadow-lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                      className="h-11"
                    >
                      <Chrome className="w-5 h-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('apple')}
                      disabled={isLoading}
                      className="h-11"
                    >
                      <AppleIcon className="w-5 h-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('facebook')}
                      disabled={isLoading}
                      className="h-11"
                    >
                      <Facebook className="w-5 h-5" />
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleGuestAccess}
                    className="w-full"
                  >
                    Continue as Guest
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          By continuing, you agree to our{" "}
          <button
            type="button"
            onClick={() => {
              setTermsDialogTab("terms");
              setShowTermsDialog(true);
            }}
            className="text-indigo-600 hover:text-indigo-700 underline font-medium"
          >
            terms of service
          </button>
          {" "}and{" "}
          <button
            type="button"
            onClick={() => {
              setTermsDialogTab("privacy");
              setShowTermsDialog(true);
            }}
            className="text-indigo-600 hover:text-indigo-700 underline font-medium"
          >
            privacy policy
          </button>
          .
        </p>
        
        <TermsPrivacyDialog
          isOpen={showTermsDialog}
          onClose={() => setShowTermsDialog(false)}
          defaultTab={termsDialogTab}
        />

        {/* Delete Account Section */}
        <Card className="shadow-lg border-red-200 bg-red-50/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                <span className="font-medium">Delete Account</span>
              </div>
              <p className="text-sm text-red-700">
                Need to delete your account? This action is permanent and cannot be undone.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    <strong>Warning:</strong> This will permanently delete your account and all associated data. This action cannot be undone.
                  </AlertDescription>
                </Alert>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="delete-email">Confirm your email</Label>
                    <Input
                      id="delete-email"
                      type="email"
                      placeholder="Enter your email"
                      value={deleteEmail}
                      onChange={(e) => setDeleteEmail(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="delete-password">Confirm your password</Label>
                    <div className="relative">
                      <Input
                        id="delete-password"
                        type={showDeletePassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowDeletePassword(!showDeletePassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showDeletePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteEmail('');
                      setDeletePassword('');
                      setError(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className="flex-1 font-bold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Forever
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}