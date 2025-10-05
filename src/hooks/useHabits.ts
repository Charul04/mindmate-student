import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Habit {
  id?: string;
  name: string;
  description?: string;
  target_frequency: number;
  color: string;
  created_at?: string;
  updated_at?: string;
}

export interface HabitEntry {
  id?: string;
  habit_id: string;
  entry_date: string;
  completed_count: number;
  created_at?: string;
  updated_at?: string;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitEntries, setHabitEntries] = useState<HabitEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchHabits = async () => {
    try {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setHabits(data || []);
    } catch (error) {
      console.error('Error fetching habits:', error);
      toast({
        title: "Error",
        description: "Failed to load habits",
        variant: "destructive",
      });
    }
  };

  const fetchHabitEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('habit_entries')
        .select('*')
        .order('entry_date', { ascending: false });

      if (error) throw error;
      setHabitEntries(data || []);
    } catch (error) {
      console.error('Error fetching habit entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const addHabit = async (habit: Omit<Habit, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Guest Mode",
          description: "You're in guest mode. Please sign in to save habits.",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase
        .from('habits')
        .insert([{
          ...habit,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setHabits(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Habit added successfully",
      });
      return true;
    } catch (error) {
      console.error('Error adding habit:', error);
      toast({
        title: "Error",
        description: "Failed to add habit",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateHabitEntry = async (habitId: string, date: string, completedCount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Guest Mode",
          description: "You're in guest mode. Please sign in to track habits.",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase
        .from('habit_entries')
        .upsert({
          habit_id: habitId,
          entry_date: date,
          completed_count: completedCount,
          user_id: user.id,
        }, {
          onConflict: 'habit_id,entry_date'
        })
        .select()
        .single();

      if (error) throw error;

      setHabitEntries(prev => {
        const existingIndex = prev.findIndex(
          entry => entry.habit_id === habitId && entry.entry_date === date
        );
        if (existingIndex >= 0) {
          const newEntries = [...prev];
          newEntries[existingIndex] = data;
          return newEntries;
        } else {
          return [...prev, data];
        }
      });

      return true;
    } catch (error) {
      console.error('Error updating habit entry:', error);
      toast({
        title: "Error",
        description: "Failed to update habit progress",
        variant: "destructive",
      });
      return false;
    }
  };

  const getHabitEntry = (habitId: string, date: string) => {
    return habitEntries.find(
      entry => entry.habit_id === habitId && entry.entry_date === date
    );
  };

  const deleteHabit = async (id: string) => {
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setHabits(prev => prev.filter(habit => habit.id !== id));
      setHabitEntries(prev => prev.filter(entry => entry.habit_id !== id));
      toast({
        title: "Success",
        description: "Habit deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast({
        title: "Error",
        description: "Failed to delete habit",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchHabitEntries();
  }, []);

  return {
    habits,
    habitEntries,
    loading,
    addHabit,
    updateHabitEntry,
    getHabitEntry,
    deleteHabit,
    refetch: () => {
      fetchHabits();
      fetchHabitEntries();
    },
  };
}