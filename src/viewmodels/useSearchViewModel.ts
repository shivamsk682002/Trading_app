// src/viewmodels/useSearchViewModel.ts

import { useState } from 'react';
import { fetchSearchResults } from '../api/StockApi';

export const useSearchViewModel = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const triggerSearch = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await fetchSearchResults(query);
      setSearchResults(data.bestMatches || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, triggerSearch };
};
