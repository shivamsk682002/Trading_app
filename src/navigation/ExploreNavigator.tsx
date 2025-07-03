import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StockStackParamList } from './types';
import ViewAllScreen from '../screens/ViewAll/viewAll';
import stockInfo from '../screens/StockInfo/stockInfo';
import ExploreScreen from '../screens/Explore/expolre';
import searchPage from '../screens/SearchPage/searchPage';

const Stack = createStackNavigator<StockStackParamList>();

export default function ExploreNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name="Explore" component={ExploreScreen} options={{ title: 'Explore' }} />
      <Stack.Screen name="ViewAll" component={ViewAllScreen} options={({ route }) => ({ title: route.params.movers })} />
      <Stack.Screen name="Search" component={searchPage} options={{ title: 'Search' }} />
      <Stack.Screen name="Product" component={stockInfo} options={({ route }) => ({ title: route.params.symbol })} />
    </Stack.Navigator>
  );
}