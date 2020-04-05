import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducers';
import profileReducer from './profileReducer';
// import dataReducer from './dataReducer';
// import locationReducer from './locationReducer';
// import companyReducer from './companyReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    // data: dataReducer,
    // location: locationReducer,
    // company: companyReducer,
});
