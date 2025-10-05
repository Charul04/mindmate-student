import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MoodEntry {
  id?: string;
  entry_date: string;
  mood: string;
  description?: string;
  trigger?: string;
  energy_level?: number;
  created_at?: string;
  updated_at?: string;
}

export function useMoodEntries() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .order('entry_date', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      toast({
        title: "Error",
        description: "Failed to load mood entries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveMoodEntry = async (entry: Omit<MoodEntry, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Guest Mode",
          description: "You're in guest mode. Please sign in to save mood entries.",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase
        .from('mood_entries')
        .insert([{
          ...entry,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setEntries(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Mood entry saved successfully",
      });
      return true;
    } catch (error) {
      console.error('Error saving mood entry:', error);
      toast({
        title: "Error",
        description: "Failed to save mood entry",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteMoodEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('mood_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEntries(prev => prev.filter(entry => entry.id !== id));
      toast({
        title: "Success",
        description: "Mood entry deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      toast({
        title: "Error",
        description: "Failed to delete mood entry",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return {
    entries,
    loading,
    saveMoodEntry,
    deleteMoodEntry,
    refetch: fetchEntries,
  };
}