import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { TrashIcon } from 'react-native-heroicons/solid';
import { getWatchlists } from '../../storage/asyncStorage';
import { Watchlist } from '../../storage/types';
import { removeStockFromWatchlist } from '../../storage/asyncStorage';
import { WatchlistSkeleton } from '../Watchlist/WatchlistSkeleton';
import { styles } from './styles';
import colors from '../../utils/colors';

const WatchlistStocks = ({ navigation }) => {
  const route = useRoute();
  const { watchlistName } = route.params;
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const all = await getWatchlists();
      const selected = all.find(w => w.name === watchlistName);
      setStocks(selected ? selected.stocks : []);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleDelete = async (symbol) => {
    await removeStockFromWatchlist(watchlistName, symbol);
    fetchStocks(); 
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.fixedHeader}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{watchlistName}</Text>
        </View>
      </View>
      <ScrollView style={styles.scroll}>

        {stocks.length === 0 ? (
          <Text style={styles.empty}>No stocks in this watchlist.</Text>
        ) : (
          loading?<WatchlistSkeleton/>:(
          stocks.map((stock, idx) => (
            <View key={idx} style={styles.stockCard}>
              <View style={styles.stockInfoRow}>
                <View>
                  <Text style={styles.stockName}>{stock.name}</Text>
                  <Text style={styles.stockMeta}>
                    {stock.symbol} • ₹{stock.price}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(stock.symbol)}>
                  <TrashIcon size={20} color={colors.red} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};



export default WatchlistStocks;

