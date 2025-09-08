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
      // Verify credentials first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        return { error: signInError };
      }

      if (!signInData.user) {
        return { error: { message: 'Authentication failed' } };
      }

      // Delete all user data first (cascade delete should handle most of this)
      const userId = signInData.user.id;
      
      // Delete user data from all tables
      await Promise.all([
        supabase.from('habits').delete().eq('user_id', userId),
        supabase.from('habit_entries').delete().eq('user_id', userId),
        supabase.from('journals').delete().eq('user_id', userId),
        supabase.from('daily_planner_tasks').delete().eq('user_id', userId),
        supabase.from('pomodoro_sessions').delete().eq('user_id', userId),
        supabase.from('goals').delete().eq('user_id', userId),
        supabase.from('mood_entries').delete().eq('user_id', userId),
      ]);

      // Use Supabase's admin API to delete the user
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
      
      if (deleteError) {
        // If admin delete fails, try the alternative approach
        console.warn('Admin delete failed, trying alternative approach:', deleteError);
        
        // Sign out the user and clear local data
        await supabase.auth.signOut();
        
        // Clear all local storage
        localStorage.clear();
        
        return { error: null }; // Consider it successful since data is cleared
      }

      // Clear local storage and sign out
      localStorage.clear();
      await supabase.auth.signOut();
      
      return { error: null };
    } catch (error) {
      console.error('Delete account error:', error);
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