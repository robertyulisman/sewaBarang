import axios from 'axios';
import {
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_PROFILE,
} from './types';

// get profile
export const getCurrentProfileData = (userId) => (dispatch) => {
    axios
        .get(`http://192.168.100.5:5000/api/user/${userId}`)
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
