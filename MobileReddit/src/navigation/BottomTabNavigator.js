import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


import HomeScreen from '../screens/HomeScreen';
import SortScreen from '../screens/SortScreen';
import DisplayScreen from '../screens/DisplayScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Sort') {
            iconName = focused ? 'sort' : 'sort-outline';
          } else if (route.name === 'Display') {
            iconName = focused ? 'display' : 'display-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sort" component={SortScreen} />
      <Tab.Screen name="Display" component={DisplayScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
