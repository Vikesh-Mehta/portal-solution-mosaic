
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface HealthRecord {
  id: string;
  record_type: string;
  title: string;
  description: string | null;
  doctor_name: string | null;
  date_recorded: string;
  vital_signs: any;
  test_results: any;
  recommendations: string | null;
  created_at: string;
}

export const useUserHealthRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthRecords = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', user.id)
        .order('date_recorded', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      console.error('Error fetching health records:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch health records');
    } finally {
      setLoading(false);
    }
  };

  const addHealthRecord = async (record: Omit<HealthRecord, 'id' | 'created_at'> & { user_id?: string }) => {
    if (!user) return { error: 'No user found' };

    try {
      const { data, error } = await supabase
        .from('health_records')
        .insert([{ ...record, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      await fetchHealthRecords(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add health record';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    fetchHealthRecords();
  }, [user]);

  return {
    records,
    loading,
    error,
    addHealthRecord,
    refetchRecords: fetchHealthRecords
  };
};
