import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RedditAPI from './src/api/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import SubredditList from './src/components/SubredditList';
import Navbar from './src/components/Navbar';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';



export default function App() {

  const redditSignIn = async () => {
   await RedditAPI.auth();
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
      <Navbar />
      <BottomTabNavigator />
      <View style={styles.content}>
        <Text>Reddit App</Text>
        <TouchableOpacity onPress={redditSignIn}><Text>SignIn with Reddit</Text></TouchableOpacity>
        <SubredditList />
      </View>
    </View>
    </NavigationContainer>
  );
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
