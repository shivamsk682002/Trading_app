import React, { useEffect } from 'react';
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
import { ExploreSkeleton } from './ExploreSkeleton.tsx';
import { styles } from './styles.ts';

type ExploreNavProp = StackNavigationProp<StockStackParamList, 'Explore', 'Search'>;

export default function ExploreScreen() {
  const { data,loading, error } = useTopMovers();
  const navigation = useNavigation<ExploreNavProp>();
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
        <TouchableOpacity onPress={() => navigation.navigate('ViewAll', { movers: key })}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items?.slice(0, 4)}
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
      {loading?<ExploreSkeleton/>:(
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderSection('Top Gainers', top_gainers, 'gainers')}
        {renderSection('Top Losers', top_losers, 'losers')}
        {renderSection('Most Actively Traded', most_actively_traded, 'active')}
      </ScrollView>)}
    </SafeAreaView>
  );
}

