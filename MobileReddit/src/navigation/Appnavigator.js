import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navbar from '../components/Navbar';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => <Navbar />
      }}
    >
      {}
    </Drawer.Navigator>
  );
};

export default AppNavigator;
