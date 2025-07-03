import React, { useCallback, useEffect, useState } from 'react';
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
import { addWatchlist, getWatchLists } from '../../storage/asyncStorage';
import { Watchlist } from '../../storage/types';
import { WatchlistStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { WatchlistSkeleton } from './WatchlistSkeleton';
import { styles } from './styles';
type WatchlistStockProp = StackNavigationProp<WatchlistStackParamList, 'WatchlistStocks'>;

const WatchlistScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [watchlistName, setWatchlistName] = useState('');
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const navigation = useNavigation<WatchlistStockProp>()
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchWatchlists();
    }, [])
  );

  const fetchWatchlists = async () => {
    setLoading(true)
    try {
      const data = await getWatchLists();
      setWatchlists(data);
    } catch (error) {
      console.error('Failed to load watchlists:', error);
    }
    finally {
      setLoading(false);
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
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>WatchList</Text>
        </View>
      </View>

      {/* Watchlists */}
      <ScrollView style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        {loading ? (
          <WatchlistSkeleton />
        ) : watchlists.length === 0 ? (
          <View style={ styles.emptyContainer}>
          <Text style={{ color: '#999' }}>No watchlists created yet.</Text>
          </View>
        ) : (
          watchlists.map((w, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                navigation.navigate('WatchlistStocks', { watchlistName: w.name });
              }}
            >
              <View style={styles.watchlistItem}>
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

