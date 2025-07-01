import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const Header = () => {
  return (
    <View>
        <TouchableOpacity style={{}} onPress={() => console.log('Search pressed')}>
      <Text >Search</Text>
    </TouchableOpacity>
        <View style={{ padding: 16, backgroundColor: '#fff', borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Groww</Text>
        </View>
        
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})