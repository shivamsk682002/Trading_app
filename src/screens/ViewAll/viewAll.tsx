import React, { use } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import StockCard from '../../components/stockCard.tsx';
import { StockStackParamList } from '../../navigation/types';
import { ExploreData } from '../Explore/type';
import { useTopMovers } from '../../hooks/useTopMovers.ts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles.ts';
import { ViewAllSkelton } from './ViewAllSkeleton.tsx';

type ViewAllRouteProp = RouteProp<StockStackParamList, 'ViewAll'>;


type Props = {
  data: ExploreData;
};


type ExploreNavProp = StackNavigationProp<StockStackParamList,  'ViewAll'>;

export default function ViewAllScreen() {
  const route = useRoute<ViewAllRouteProp>();
  const { movers } = route.params;
  const { data, loading, error } = useTopMovers();
  const navigation = useNavigation<ExploreNavProp>();
  const section =movers;
  

  if (error || !data || Object.keys(data).length === 0) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Error loading data</Text>
    </SafeAreaView>
  );
}


  const items = (
    section === 'gainers' ? data.top_gainers :
    section === 'losers' ? data.top_losers :
    data.most_actively_traded
  );

  const title =
    section === 'gainers' ? 'Top Gainers' :
    section === 'losers' ? 'Top Losers' :
    'Most Actively Traded';

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}} edges={['top']}>
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
      </View>
    <ScrollView style={styles.container}>
  {loading ? (
    <ViewAllSkelton />
  ) : (
    <>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <StockCard stock={item} />}
        keyExtractor={(item) => item.ticker}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </>
  )}
</ScrollView>

    </SafeAreaView>
  );
}

