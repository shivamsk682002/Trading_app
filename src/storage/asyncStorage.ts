import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopMoversResponse } from './types';
import { Watchlist,WatchlistData,WatchlistStock } from './types';

const STORAGE_KEY = 'TOP_MOVERS_DATA';
const WATCHLIST_STORAGE_KEY = 'WATCHLIST_DATA';

export const saveTopMovers = async (data: TopMoversResponse) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

export const getTopMovers = async (): Promise<TopMoversResponse | null> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Error reading data from AsyncStorage:', error);
    return null;
  }
};

export const getWatchLists = async(): Promise<Watchlist[]>=>{
    try{
        const json = await AsyncStorage.getItem(WATCHLIST_STORAGE_KEY);
        return json?JSON.parse(json):[];
    }
    catch(error){
        console.log('Error getting watclist',error);
        return []
    }
} 

export const getWatchlists = async (): Promise<Watchlist[]> => {
  try {
    const json = await AsyncStorage.getItem(WATCHLIST_STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error getting watchlists:', e);
    return [];
  }
};

// Save all watchlists
export const saveWatchlists = async (watchlists: Watchlist[]) => {
  try {
    await AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlists));
  } catch (e) {
    console.error('Error saving watchlists:', e);
  }
};

// Add a new watchlist (throws error if name exists)
export const addWatchlist = async (name: string) => {
  try {
    const current = await getWatchlists();
    const exists = current.some(w => w.name.toLowerCase() === name.toLowerCase());

    if (exists) {
      throw new Error('Watchlist already exists');
    }

    const newWatchlist: Watchlist = {
      name,
      stocks: [],
    };

    await saveWatchlists([...current, newWatchlist]);
  } catch (error) {
    throw error;
  }
};

// Add stock to a specific watchlist
export const addStockToWatchlist = async (
  watchlistName: string,
  stock: WatchlistStock
) => {
  try {
    const current = await getWatchlists();
    const updated = current.map(w =>
      w.name.toLowerCase() === watchlistName.toLowerCase()
        ? { ...w, stocks: [...w.stocks, stock] }
        : w
    );
    await saveWatchlists(updated);
  } catch (error) {
    console.error('Error adding stock to watchlist:', error);
  }
};

// Remove stock from a specific watchlist
export const removeStockFromWatchlist = async (
  watchlistName: string,
  symbol: string
) => {
  try {
    const current = await getWatchlists();
    const updated = current.map(w =>
      w.name.toLowerCase() === watchlistName.toLowerCase()
        ? { ...w, stocks: w.stocks.filter(s => s.symbol !== symbol) }
        : w
    );
    await saveWatchlists(updated);
  } catch (error) {
    console.error('Error removing stock from watchlist:', error);
  }
};
