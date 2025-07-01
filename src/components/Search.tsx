import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const Search = () => {
  return (
    <View>
      <View style={styles.container}>
        <TextInput
        placeholder='Search for Stocks,Etfs ans more'
        style={styles.searchInput}>
            
        </TextInput>
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    searchInput:{
        width: '100%',
        height: 48,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        marginTop: 10

    }
})