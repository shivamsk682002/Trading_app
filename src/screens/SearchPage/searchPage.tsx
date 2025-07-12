import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { StockStackParamList } from '../../components/types';
import { useNavigation } from '@react-navigation/native';
import { SearchSkeleton } from './SearchSkeleton';
import { useSearchViewModel } from '../../viewmodels/useSearchViewModel';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/scale';
import { styles } from './styles';

type ExploreNavProp = StackNavigationProp<StockStackParamList, 'Product'>;

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<ExploreNavProp>();
  const { searchResults, loading, triggerSearch } = useSearchViewModel();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        triggerSearch(search);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('Product', {
          symbol: item['1. symbol'],
        })
      }
    >
      <Text style={styles.symbol}>{item['1. symbol']}</Text>
      <Text style={styles.name}>{item['2. name']}</Text>
      <Text style={styles.type}>{item['3. type']}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeftIcon size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchInputWrapper}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search for Stocks, ETFs and more"
            style={styles.searchInput}
          />
        </View>
      </View>

      {loading ? (
        <SearchSkeleton />
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => `${item['1. symbol']}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : search.trim() !== '' ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No matches found.</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default SearchPage;