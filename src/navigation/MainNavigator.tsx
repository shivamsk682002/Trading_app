import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import TabsNavigator from './TabsNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}