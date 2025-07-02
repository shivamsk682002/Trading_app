/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@react-native-masked-view/masked-view';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    // <View style={styles.container}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <NewAppScreen templateFileName="App.tsx" />
    // </View>
    
    <GestureHandlerRootView style = {{flex: 1}}>
      <SafeAreaProvider>
      <MainNavigator/>
      </SafeAreaProvider>
    </GestureHandlerRootView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;