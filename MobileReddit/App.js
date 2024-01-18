import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SubredditList from './src/components/SubredditList';
import Navbar from './src/components/Navbar';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import WebView from 'react-native-webview';
import { useState } from 'react';



export default function App() {
  const [loggedIn, setLoggedIn] = useState(undefined)
  if (loggedIn == undefined){
  return (<WebView
  onNavigationStateChange={(e) => console.log(e.url)}
    source={{
      uri: 'https://www.reddit.com/api/v1/authorize?client_id=uZn6VSguEYlIotyFcB3VEQ&response_type=code&state=cocomelon&redirect_uri=http://localhost:3000/callback&duration=temporary&scope=subscribe'
    }}/>)
  } else {
  return (
    <NavigationContainer>
      <View style={styles.container}>
      <Navbar />
      <BottomTabNavigator />
      <View style={styles.content}>
        <Text>Reddit App</Text>
          
        <SubredditList />
      </View>
    </View>
    </NavigationContainer>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
