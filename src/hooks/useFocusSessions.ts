import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FocusSession {
  id?: string;
  session_type: 'work' | 'break';
  duration_minutes: number;
  completed: boolean;
  session_date: string;
  created_at?: string;
  updated_at?: string;
}

export function useFocusSessions() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions((data || []) as FocusSession[]);
    } catch (error) {
      console.error('Error fetching focus sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load focus sessions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSession = async (session: Omit<FocusSession, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save focus sessions",
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

      setSessions(prev => [data as FocusSession, ...prev]);
      return true;
    } catch (error) {
      console.error('Error saving focus session:', error);
      toast({
        title: "Error",
        description: "Failed to save focus session",
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
        session.session_type === 'work'
      )
      .reduce((total, session) => total + session.duration_minutes, 0);
  };

  const getWeeklyFocusTime = (startDate: Date, endDate: Date) => {
    return sessions
      .filter(session => {
        const sessionDate = new Date(session.session_date);
        return sessionDate >= startDate && 
               sessionDate <= endDate && 
               session.session_type === 'work';
      })
      .reduce((total, session) => total + session.duration_minutes, 0);
  };

  const getMonthlyStats = (year: number, month: number) => {
    const monthSessions = sessions.filter(session => {
      const sessionDate = new Date(session.session_date);
      return sessionDate.getFullYear() === year &&
             sessionDate.getMonth() === month;
    });

    const workSessions = monthSessions.filter(s => s.session_type === 'work');
    const totalMinutes = workSessions.reduce((sum, s) => sum + s.duration_minutes, 0);
    const averageSession = workSessions.length > 0 ? totalMinutes / workSessions.length : 0;

    return {
      totalSessions: workSessions.length,
      totalMinutes,
      averageSession: Math.round(averageSession),
      daysActive: new Set(workSessions.map(s => s.session_date)).size
    };
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
    getWeeklyFocusTime,
    getMonthlyStats,
    refetch: fetchSessions,
  };
}