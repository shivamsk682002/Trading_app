import { useEffect, useState } from 'react';
import { getTopMovers } from '../storage/asyncStorage';
import { TopMoversResponse } from './types';
import { scheduleTopMoversUpdate } from '../utils/intervalFetcher';

export const useTopMovers = () => {
  const [data, setData] = useState<TopMoversResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await scheduleTopMoversUpdate(); // this should also handle AsyncStorage update
        const savedData = await getTopMovers();
        if (!savedData) throw new Error('No data found in storage');
        setData(savedData);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};
