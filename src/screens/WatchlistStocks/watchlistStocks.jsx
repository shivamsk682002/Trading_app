import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import { getWatchlists } from '../../storage/asyncStorage';
import { Watchlist } from '../../storage/types';

const WatchlistStocks = ({ navigation }) => {
  const route = useRoute();
  const { watchlistName } = route.params;

  const [stocks, setStocks] = useState([]);

  const fetchStocks = async () => {
    try {
      const all = await getWatchlists();
      const selected = all.find(w => w.name === watchlistName);
      setStocks(selected ? selected.stocks : []);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{watchlistName}</Text>
        </View>
      </View>

      {/* Stock List */}
      <ScrollView style={styles.scroll}>
        {stocks.length === 0 ? (
          <Text style={styles.empty}>No stocks in this watchlist.</Text>
        ) : (
          stocks.map((stock, idx) => (
            <View key={idx} style={styles.stockCard}>
              <Text style={styles.stockName}>{stock.name}</Text>
              <Text style={styles.stockMeta}>
                {stock.symbol} • ₹{stock.price}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WatchlistStocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  stockCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  stockName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  stockMeta: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#999',
  },
});
