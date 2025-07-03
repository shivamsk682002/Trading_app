import React, { useEffect, useState, forwardRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import type { Ref } from 'react';
import {
  getWatchlists,
  addWatchlist,
  addStockToWatchlist,
} from '../../storage/asyncStorage';
import type { WatchlistStock, Watchlist } from '../../storage/types';
import { PlusCircleIcon } from 'react-native-heroicons/outline';
import { styles } from './styles';
import colors from '../../utils/colors';

export type BottomTabModalRef = Modalize;

interface BottomTabModalProps {
  stockName: string;
  stockSymbol: string;
  price: number;
}

const BottomTabModal = forwardRef<BottomTabModalRef, BottomTabModalProps>(
  ({ stockSymbol, stockName, price }, ref: Ref<BottomTabModalRef>) => {
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newWatchlistName, setNewWatchlistName] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
      fetchWatchlists();
    }, [count]);

    const fetchWatchlists = async () => {
      const data = await getWatchlists();
      setWatchlists(data);
    };

    const handleAddToWatchlist = async (watchlistName: string) => {
      try {
        const stock: WatchlistStock = {
          symbol: stockSymbol,
          name: stockName,
          price,
        };
        await addStockToWatchlist(watchlistName, stock);
        (ref as any)?.current?.close();
        setTimeout(() => {
          Alert.alert('Success', `Added ${stockSymbol} to "${watchlistName}"`);
        }, 300);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to add stock');
      }
    };

    const handleCreateWatchlist = async () => {
      if (!newWatchlistName.trim()) {
        Alert.alert('Error', 'Please enter a watchlist name.');
        return;
      }

      try {
        await addWatchlist(newWatchlistName.trim());
        setNewWatchlistName('');
        setModalVisible(false);
        setCount((prev) => prev + 1);
        Alert.alert('Success', 'Watchlist created!');
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Could not create watchlist');
      }
    };

    return (
      <>
        <Modalize
  ref={ref}
  modalHeight={500}
  handleStyle={styles.handle}
  modalStyle={styles.modal}
>
  <View style={styles.sheetContainer}>
    <View style={styles.container2}>
      <Text style={styles.title}>Add "{stockName}" to Watchlist</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {watchlists.length === 0 ? (
          <View style={styles.emptyContainer}>
          <Text style={{ color: '#999' }}>No watchlists found.</Text>
          </View>
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
      </ScrollView>
    </View>

    {/* FAB fixed to bottom-right of sheet */}
    <TouchableOpacity
      style={styles.fabButton}
      onPress={() => setModalVisible(true)}
    >
      <PlusCircleIcon size={48} color={colors.bluePrimary} />
    </TouchableOpacity>
  </View>
</Modalize>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Enter Watchlist Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Tech Stocks"
                value={newWatchlistName}
                onChangeText={setNewWatchlistName}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCreateWatchlist}>
                  <Text style={styles.createButton}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
);

export default BottomTabModal;
