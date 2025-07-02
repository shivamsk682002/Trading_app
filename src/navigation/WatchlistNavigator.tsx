import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WatchlistStackParamList } from './types';
import WatchListScreen from '../screens/Watchlist/watchlist';
import stockInfo from '../screens/StockInfo/stockInfo';
import WatchlistStocks from '../screens/WatchlistStocks/watchlistStocks';

const Stack = createStackNavigator<WatchlistStackParamList>();

export default function WatchlistStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Watchlist" component={WatchListScreen} options={{ title: 'My Watchlist' }} />
      <Stack.Screen
        name="WatchlistStocks"
        component={WatchlistStocks}
        options={({ route }) => ({ title: route.params.watchlistName || 'Watchlist Stocks' })}
      />
      <Stack.Screen name="Product" component={stockInfo} options={({ route }) => ({ title: route.params.symbol })} />
    </Stack.Navigator>
  );
}