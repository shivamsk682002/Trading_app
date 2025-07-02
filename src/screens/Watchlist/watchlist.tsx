import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { addWatchlist,getWatchLists } from '../../storage/asyncStorage';
import { Watchlist } from '../../storage/types';
import { WatchlistStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type WatchlistStockProp=StackNavigationProp<WatchlistStackParamList, 'WatchlistStocks'>;

const WatchlistScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [watchlistName, setWatchlistName] = useState('');
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const navigation = useNavigation<WatchlistStockProp>()

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const fetchWatchlists = async () => {
    try {
      const data = await getWatchLists();
      setWatchlists(data);
    } catch (error) {
      console.error('Failed to load watchlists:', error);
    }
  };

  const handleCreateWatchlist = async () => {
    try {
      if (!watchlistName.trim()) {
        Alert.alert('Error', 'Please enter a watchlist name');
        return;
      }

      await addWatchlist(watchlistName.trim());
      setWatchlistName('');
      setModalVisible(false);
      Alert.alert('Success', 'Watchlist created!');
      fetchWatchlists();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Could not create watchlist');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.fixedHeader}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>WatchList</Text>
        </View>
      </View>

      {/* Watchlists */}
      <ScrollView style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        {watchlists.length === 0 ? (
          <Text style={{ color: '#999' }}>No watchlists created yet.</Text>
        ) : (
          watchlists.map((w, idx) => (
            <TouchableOpacity onPress={()=>{navigation.navigate('WatchlistStocks',{ watchlistName:w.name })}}>
            <View key={idx} style={styles.watchlistItem}>
              <Text style={styles.watchlistName}>{w.name}</Text>
              <Text style={styles.stockCount}>{w.stocks.length} stocks</Text>
            </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <PlusCircleIcon size={48} color="#007bff" />
      </TouchableOpacity>

      {/* Modal */}
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
              value={watchlistName}
              onChangeText={setWatchlistName}
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
    </SafeAreaView>
  );
};

export default WatchlistScreen;

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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#fff',
    borderRadius: 100,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 20,
  },
  cancelButton: {
    fontSize: 14,
    color: '#888',
  },
  createButton: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  watchlistItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  watchlistName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockCount: {
    fontSize: 12,
    color: '#666',
  },
});


