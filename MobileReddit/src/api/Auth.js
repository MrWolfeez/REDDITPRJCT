import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize } from 'react-native-app-auth';

const config = {
    redirectUrl: 'http://localhost:3000/callback',
    clientId: 'uZn6VSguEYlIotyFcB3VEQ',
    scopes: ['identity', 'read'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
        tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
};

const RedditAPI = {
    authMethod: async () => {
        try {
            const result = await authorize(config);
            console.log('Auth result:', result);

            if (result.access_token) {
                await AsyncStorage.setItem('access_token', result.accessToken);
                return result;
            } else {
                console.warn('No access token received');
                return null;
            }
        } catch (error) {
            console.error('Auth error:', error);
            throw error;
        }
    },

    getAccessToken: async () => {
        try {
            const accessToken = await AsyncStorage.getItem('access_token');
            return accessToken;
        } catch (error) {
            console.error('Error getting access token from AsyncStorage:', error);
            return null;
        }
    },
};

export default RedditAPI;
