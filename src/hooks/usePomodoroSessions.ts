import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PomodoroSession {
  id?: string;
  session_type: 'work' | 'break';
  duration_minutes: number;
  completed: boolean;
  session_date: string;
  created_at?: string;
  updated_at?: string;
}

export function usePomodoroSessions() {
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions((data || []) as PomodoroSession[]);
    } catch (error) {
      console.error('Error fetching pomodoro sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load pomodoro sessions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSession = async (session: Omit<PomodoroSession, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save pomodoro sessions",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .insert([{
          ...session,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setSessions(prev => [data as PomodoroSession, ...prev]);
      return true;
    } catch (error) {
      console.error('Error saving pomodoro session:', error);
      toast({
        title: "Error",
        description: "Failed to save pomodoro session",
        variant: "destructive",
      });
      return false;
    }
  };

  const getCompletedSessionsByDate = (date: string) => {
    return sessions.filter(
      session => session.session_date === date && session.completed
    );
  };

  const getTotalFocusTime = (date: string) => {
    return sessions
      .filter(session => 
        session.session_date === date && 
        session.session_type === 'work' && 
        session.completed
      )
      .reduce((total, session) => total + session.duration_minutes, 0);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return {
    sessions,
    loading,
    saveSession,
    getCompletedSessionsByDate,
    getTotalFocusTime,
    refetch: fetchSessions,
  };
}