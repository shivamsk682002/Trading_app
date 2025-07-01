import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreNavigator from './ExploreNavigator';
import WatchlistNavigator from './WatchlistNavigator';

const Tab = createBottomTabNavigator();

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Explore" component={ExploreNavigator}  />
      <Tab.Screen name="Watchlist" component={WatchlistNavigator} />
    </Tab.Navigator>
  );
}