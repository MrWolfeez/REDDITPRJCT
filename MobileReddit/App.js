import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SubredditList from './src/components/SubredditList';
import Navbar from './src/components/Navbar';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import WebView from 'react-native-webview';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const handleLogin = (code) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Authorization", "Basic dVpuNlZTZ3VFWWxJb3R5RmNCM1ZFUTozTGdMMkIxOWdTYmIyTHY4UVBNNVAtTExEaHd3UFE=");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);
    urlencoded.append("redirect_uri", "http://localhost:3000/callback");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback`,
      redirect: 'follow'
    };

    fetch("https://www.reddit.com/api/v1/access_token", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      setLoggedIn(true);
      AsyncStorage.setItem('accessToken', result.accessToken);
    })
    .catch(error => console.log('error', error));
  }

  const getAccessToken = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        return accessToken;
    } catch (error) {
        console.log(error);
        return null;        
    }
  }

  if (loggedIn == undefined){
  return (<WebView
  onNavigationStateChange={(e) => handleLogin(e.url)}
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
