import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    if (isSigningOut) {
      return { error: null }; // Already signing out, don't call again
    }

    try {
      setIsSigningOut(true);
      
      // Check if there's actually a session to sign out from
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (!currentSession) {
        // No active session, just clear local state
        setSession(null);
        setUser(null);
        return { error: null };
      }

      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: { message: 'Failed to sign out' } };
    } finally {
      setIsSigningOut(false);
    }
  };

  const deleteAccount = async (email: string, password: string) => {
    try {
      // First sign in to verify credentials
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        return { error: signInError };
      }

      // Get the current session to get the access token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        return { error: { message: 'No valid session found' } };
      }

      // Use the REST API to delete the user
      const response = await fetch(`https://zjkkvqxprinrkietbqda.supabase.co/auth/v1/user`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: { message: errorData.message || 'Failed to delete account' } };
      }

      // Don't call signOut - user is already deleted
      // Just clear local state
      setSession(null);
      setUser(null);
      
      return { error: null };
    } catch (error) {
      return { error: error as any };
    }
  };

  return {
    user,
    session,
    loading,
    isSigningOut,
    signUp,
    signIn,
    signOut,
    deleteAccount,
  };
}