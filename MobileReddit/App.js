import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SubredditList from './src/components/SubredditList';
import Navbar from './src/components/Navbar';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import WebView from 'react-native-webview';
import { useState } from 'react';
import Auth from './src/api/Auth.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
 
// const getAccessToken = async () => {
//   try {
//     const accessToken = await AsyncStorage.getItem('access_token');
//     return accessToken;
//   } catch (error) {
//     console.error('Error getting access token:', error);
//     return null;
//   }
// };
 
const codeFromUrl = (url) => {
  const urlHash = url.split('#')[0];
  const codeUrl = urlHash.lastIndexOf('code=');
  if (codeUrl !== -1){
    const codeStart = codeUrl + 'code='.length;
    const code = urlHash.substring(codeStart);
    return code;
  }
    return null;
}
 
export default function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);
 
  const handleLogin = async (code) => {
    try {
      const authResult = await Auth.authMethod(code);
      if (authResult && authResult.accessToken) {
        
        setLoggedIn(true);
        console.log("Access Token Stored:", authResult.accessToken);
      } else {
        
        setLoggedIn(false);
        console.error("No access token received from auth method");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic dVpuNlZTZ3VFWWxJb3R5RmNCM1ZFUTozTGdMMkIxOWdTYmIyTHY4UVBNNVAtTExEaHd3UFE=");
 
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);
    urlencoded.append("redirect_uri", "http://localhost:3000/callback");
 
    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic dVpuNlZTZ3VFWWxJb3R5RmNCM1ZFUTozTGdMMkIxOWdTYmIyTHY4UVBNNVAtTExEaHd3UFE=`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback`,
      redirect: 'follow'
    };
   
   
    fetch("https://www.reddit.com/api/v1/access_token", requestOptions)
    .then(response => response.json())
    .then(async (result) => {
      console.log("API Response:", result);
      if (result && result.access_token) {
        await AsyncStorage.setItem('access_token', result.access_token);
        setLoggedIn(true);
        console.log("Access Token Stored:", result.access_token);
      } else {
        console.error("No access token available", result);
      }
    })
    .catch(error => {
      console.error('Error fetching access token:', error);
    });  
  }
 
 
  if (loggedIn == undefined){
  return (
  <WebView
  onNavigationStateChange={(e) => {
    const extractedCode= codeFromUrl(e.url);
    if (extractedCode){
      handleLogin(extractedCode)
    }
    }}
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