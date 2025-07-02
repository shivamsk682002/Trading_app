import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';
import ApiRoutes from '../../api/ApiRoutes/ApiRoutes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { StockStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { SearchSkeleton } from './SearchSkeleton';

type ExploreNavProp = StackNavigationProp<StockStackParamList, 'Product'>;
const SearchPage = () => {

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation<ExploreNavProp>();
  const [loading, setLoading] = useState(false);

  const getSearchResults = async (query: String) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tencent&apikey=demo");
      const data = await response.json();
      console.log(data);
      setSearchResults(data.bestMatches || []);
    } catch (e) {
      console.error('API call failed:', e);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getSearchResults(search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Product', { symbol: item['1. symbol'] })}>
      <Text style={styles.symbol}>{item['1. symbol']}</Text>
      <Text style={styles.name}>{item['2. name']}</Text>
      <Text style={styles.type}>{item['3. type']}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search for Stocks, ETFs and more"
        style={styles.searchInput}
      />

      {loading ? (
        <SearchSkeleton />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => `${item['1. symbol']}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  list: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  name: {
    fontSize: 14,
    color: '#333',
  },
  type: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
