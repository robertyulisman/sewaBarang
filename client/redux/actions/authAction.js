import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, SET_CURRENT_PROFILE } from './types';
import { ToastAndroid } from 'react-native';
import React from 'react';

import { AsyncStorage } from 'react-native';

//register user
export const registerUser = (userData, navigation) => async (dispatch) => {
    await axios
        .post('http://192.168.100.5:5000/api/user/register', userData)
        .then((response) => {
            navigation.navigate('Login');
            ToastAndroid.show(
                'anda berhasil mendaftar, silahkan login',
                ToastAndroid.SHORT,
            );
        })

        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
                ToastAndroid.show(
                    'ada kesalahan, cek kembali',
                    ToastAndroid.SHORT,
                );
        });
};

// Login User
export const loginUser = (userData) => async (dispatch) => {
    await axios
        .post('http://192.168.100.5:5000/api/user/login', userData)
        .then((response) => {
            const { token, user } = response.data;
            AsyncStorage.setItem('jwtToken', token);
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (error, stores) => {
                    stores.map((result, i, store) => {
                        console.log({ [store[i][0]]: store[i][1] });
                        return true;
                    });
                });
            });

            // Set token of request header
            setAuthToken(token);

            dispatch(setCurrentUser(user));
            dispatch(setCurrentProfile(user));

            // const { rememberMe, email, password } = userData;
            // if (rememberMe) {
            //     const userCredentials = {
            //         email,
            //         password,
            //         rememberMe: rememberMe,
            //     };
            //     AsyncStorage.setItem(
            //         'userCredentials',
            //         JSON.stringify(userCredentials),
            //     );
            // } else {
            //     AsyncStorage.removeItem('userCredentials');
            // }

            ToastAndroid.show(
                'You have successfully logged in',
                ToastAndroid.SHORT,
            );
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

//set logged user
export const setCurrentUser = (user) => async (dispatch) => {
    await dispatch({
        type: SET_CURRENT_USER,
        payload: user,
    });
};

// log user out
export const logoutUser = () => (dispatch) => {
    // remove token from async storage
    AsyncStorage.removeItem('jwtToken');
    // remove auth header for future request
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
