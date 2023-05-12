import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux';
import { loadingSliceActions } from '../store/loadingSlice';

// Save the access token
export const saveAccessToken = async (token) => {
    try {
        await AsyncStorage.setItem('@accessToken', token);
    } catch (error) {
        console.log(error);
    }
};

// Retrieve the access token
export const getAccessToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@accessToken');
        return token;
    } catch (error) {
        console.log(error);
        return null
    }
};