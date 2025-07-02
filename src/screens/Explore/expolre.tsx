import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Stock, StockSectionKey, TopMoversResponse } from './type';
import StockCard from '../../components/stockCard.tsx';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StockStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTopMovers } from '../../hooks/useTopMovers.ts';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';

type ExploreNavProp = StackNavigationProp<StockStackParamList, 'Explore', 'Search'>;

export default function ExploreScreen() {
  const { data, loading, error } = useTopMovers();
  const navigation = useNavigation<ExploreNavProp>();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error loading data</Text>
      </SafeAreaView>
    );
  }

  const top_gainers = data.top_gainers;
  const top_losers = data.top_losers;
  const most_actively_traded = data.most_actively_traded;

  const renderSection = (title: string, items: Stock[], key: StockSectionKey) => (
    <View style={styles.section} key={key}>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ViewAll', { section: key })}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items.slice(0, 4)}
        renderItem={({ item }) => <StockCard stock={item} />}
        keyExtractor={item => item.ticker}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../assets/logo.jpg')}
              style={styles.logoImage}
            />
          </View>
          <Text style={styles.logoText}>Tradrrr</Text>
        </View>
        <TouchableOpacity style={{paddingRight:4}}onPress={() => navigation.navigate('Search')}>
          <MagnifyingGlassIcon size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderSection('Top Gainers', top_gainers, 'gainers')}
        {renderSection('Top Losers', top_losers, 'losers')}
        {renderSection('Most Actively Traded', most_actively_traded, 'active')}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  logoWrapper: {
    padding: 4,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#fff',
  },
  logoImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  viewAll: {
    fontSize: 14,
    color: '#007AFF',
  },
});
