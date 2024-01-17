import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const SortScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Écran de tri</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  text: {
    fontSize: 24, 
    fontWeight: 'bold',
  },
});


export default SortScreen;
