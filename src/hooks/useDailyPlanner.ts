import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DailyTask {
  id?: string;
  task: string;
  task_date: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at?: string;
  updated_at?: string;
}

export function useDailyPlanner() {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_planner_tasks')
        .select('*')
        .order('task_date', { ascending: false });

      if (error) throw error;
      setTasks((data || []) as DailyTask[]);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: string, taskDate: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Guest Mode",
          description: "You're in guest mode. Please sign in to add tasks.",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase
        .from('daily_planner_tasks')
        .insert([{
          task,
          task_date: taskDate,
          priority,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => [data as DailyTask, ...prev]);
      toast({
        title: "Success",
        description: "Task added successfully",
      });
      return true;
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateTask = async (id: string, updates: Partial<DailyTask>) => {
    try {
      const { data, error } = await supabase
        .from('daily_planner_tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => prev.map(task => task.id === id ? data as DailyTask : task));
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daily_planner_tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter(task => task.task_date === date);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    getTasksByDate,
    refetch: fetchTasks,
  };
}