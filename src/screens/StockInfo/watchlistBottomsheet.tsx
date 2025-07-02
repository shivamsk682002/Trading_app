import React, { useEffect, useState, forwardRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import type { Ref } from 'react';
import { getWatchlists, addStockToWatchlist } from '../../storage/asyncStorage';
import type { WatchlistStock, Watchlist } from '../../storage/types';

export type BottomTabModalRef = Modalize;

interface BottomTabModalProps {
  stockName: string;
  stockSymbol: string;
  price: number;
}

const BottomTabModal = forwardRef<BottomTabModalRef, BottomTabModalProps>(
  ({ stockSymbol, stockName, price }, ref: Ref<BottomTabModalRef>) => {
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
    const [count,setCount]=useState(0);

    useEffect(() => {
      fetchWatchlists();
    }, [count]);

    const fetchWatchlists = async () => {
      const data = await getWatchlists();
      setWatchlists(data);
    };

    const handleAddToWatchlist = async (watchlistName: string) => {
      try {
        setCount(prev => prev + 1);
        const stock: WatchlistStock = {
          symbol: stockSymbol,
          name: stockName,
          price,
        };

        await addStockToWatchlist(watchlistName, stock);

        // Close modal
        (ref as any)?.current?.close();

        // Show alert after modal closes to avoid UI issues
        setTimeout(() => {
          Alert.alert('Success', `Added ${stockSymbol} to "${watchlistName}"`);
        }, 300);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to add stock');
      }
    };

    return (
      <Modalize
        ref={ref}
        modalHeight={500}
        handleStyle={styles.handle}
        modalStyle={styles.modal}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Add "{stockName}" to Watchlist</Text>

          {watchlists.length === 0 ? (
            <Text style={{ color: '#999' }}>No watchlists found.</Text>
          ) : (
            watchlists.map((w, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.tab}
                onPress={() => handleAddToWatchlist(w.name)}
              >
                <Text style={styles.tabText}>{w.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </Modalize>
    );
  }
);

export default BottomTabModal;

const styles = StyleSheet.create({
  handle: {
    backgroundColor: '#ccc',
    width: 60,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  },
  modal: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  container: {
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  tabText: {
    fontSize: 16,
  },
});

