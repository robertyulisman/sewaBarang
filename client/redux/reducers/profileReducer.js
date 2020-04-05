import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_PROFILE,
} from './../actions/types';

const initialState = {
    profile: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: {},
            };

        case SET_CURRENT_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };

        default:
            return state;
    }
}
