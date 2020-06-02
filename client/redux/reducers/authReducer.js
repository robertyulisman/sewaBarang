import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from './../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
	isLoading: false,
  isLogin: false,
  token: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length > 0,
        user: action.payload,
        isLoading: false,
				isLogin: true,
				token: action.payload,
      };

    default:
      return state;
  }
}
