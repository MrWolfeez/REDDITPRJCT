import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize } from 'react-native-app-auth'

const config = {
    redirectUrl: 'http://localhost:3000/callback',
    clientId: 'uZn6VSguEYlIotyFcB3VEQ',
    scopes: ['identity','read'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
        tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
};

const RedditAPI = {

    auth: async () => {
        try {
            const result = await authorize(config);
            console.log('token :', result);
    
            await AsyncStorage.setItem('accessToken', result.accessToken);
        }
        catch (error){
            console.log('error :', error);
        }
    },
    
    getAccessToken: async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            return accessToken;
        } catch (error) {
            console.log(error);
            return null;        
        }
    },
};

export default RedditAPI;