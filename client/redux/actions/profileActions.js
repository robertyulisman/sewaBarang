import axios from 'axios';
import {
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_PROFILE,
} from './types';
import { apiUrl } from '../../config';

// get profile
export const getCurrentProfileData = (userId) => (dispatch) => {
    axios
        .get(`${apiUrl}/api/user/${userId}`)
        .then((response) => {
            console.log('redux', response.data);
            dispatch({
                type: GET_PROFILE,
                payload: response.data,
            });
        })
        .catch((err) =>
            dispatch({
                type: GET_PROFILE,
                payload: {},
            }),
        );
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    };
};

// Set Profile
export const setCurrentProfile = (userProfile) => {
    return {
        type: SET_CURRENT_PROFILE,
        payload: userProfile,
    };
};
