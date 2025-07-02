import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreNavigator from './ExploreNavigator';
import WatchlistNavigator from './WatchlistNavigator';
import { GlobeAltIcon, BookmarkIcon } from 'react-native-heroicons/outline';

const Tab = createBottomTabNavigator();

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',   // Active color (like Groww)
        tabBarInactiveTintColor: '#888',    // Inactive tab color
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <GlobeAltIcon color={color} size={size || 24} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <BookmarkIcon color={color} size={size || 24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
