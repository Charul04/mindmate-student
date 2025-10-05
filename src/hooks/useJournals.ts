import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Journal {
  id?: string;
  content: string;
  entry_date: string;
  created_at?: string;
  updated_at?: string;
}

export function useJournals() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchJournals = async () => {
    try {
      console.log('🔍 Fetching journals...');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('👤 Current user:', user?.email || 'Not signed in');
      
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('entry_date', { ascending: false });

      console.log('📊 Journal query result:', { data: data?.length || 0, error });
      
      if (error) throw error;
      setJournals(data || []);
    } catch (error) {
      console.error('❌ Error fetching journals:', error);
      toast({
        title: "Error",
        description: "Failed to load journals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveJournal = async (content: string, entryDate: string) => {
    try {
      console.log('💾 Saving journal entry...', { content: content.substring(0, 50) + '...', entryDate });
      const { data: { user } } = await supabase.auth.getUser();
      console.log('👤 User for saving:', user?.email || 'Not signed in');
      
      if (!user) {
        toast({
          title: "Guest Mode",
          description: "You're in guest mode. Please sign in to save journal entries.",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase
        .from('journals')
        .insert([{
          content,
          entry_date: entryDate,
          user_id: user.id,
        }])
        .select()
        .single();

      console.log('💾 Save result:', { data: !!data, error });

      if (error) throw error;

      setJournals(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Journal entry saved successfully",
      });
      return true;
    } catch (error) {
      console.error('❌ Error saving journal:', error);
      toast({
        title: "Error",
        description: "Failed to save journal entry",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteJournal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('journals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setJournals(prev => prev.filter(journal => journal.id !== id));
      toast({
        title: "Success",
        description: "Journal entry deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting journal:', error);
      toast({
        title: "Error",
        description: "Failed to delete journal entry",
        variant: "destructive",
      });
    }
  };

  const getJournalsByDate = (date: string) => {
    return journals.filter(journal => journal.entry_date === date);
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return {
    journals,
    loading,
    saveJournal,
    deleteJournal,
    getJournalsByDate,
    refetch: fetchJournals,
  };
}