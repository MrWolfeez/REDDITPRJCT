import React from 'react';
import { Button, View } from 'react-native';
import RedditAPI from '../api/Auth';

const LoginScreen = () => {
  const handleLogin = async () => {
    try {
      await RedditAPI.auth();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View>
      <Button title="Login with Reddit" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
