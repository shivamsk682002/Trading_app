import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getWatchlists, addWatchlist, addStockToWatchlist } from '../storage/asyncStorage';
import { Watchlist, WatchlistStock } from '../storage/types';

export const useWatchlistModalViewModel = (stock: WatchlistStock) => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWatchlists = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getWatchlists();
      setWatchlists(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch watchlists');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddToWatchlist = async (watchlistName: string, onSuccess?: () => void) => {
    try {
      await addStockToWatchlist(watchlistName, stock);
      onSuccess?.();
      setTimeout(() => {
        Alert.alert('Success', `Added ${stock.symbol} to "${watchlistName}"`);
      }, 300);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add stock');
    }
  };

  const handleCreateWatchlist = async (onSuccess?: () => void) => {
    if (!newWatchlistName.trim()) {
      Alert.alert('Error', 'Please enter a watchlist name.');
      return;
    }

    try {
      await addWatchlist(newWatchlistName.trim());
      setNewWatchlistName('');
      await fetchWatchlists(); // ✅ Ensure new watchlist is fetched
      onSuccess?.();
      Alert.alert('Success', 'Watchlist created!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Could not create watchlist');
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, [fetchWatchlists]);

  return {
    watchlists,
    newWatchlistName,
    setNewWatchlistName,
    handleAddToWatchlist,
    handleCreateWatchlist,
    loading,
  };
};
