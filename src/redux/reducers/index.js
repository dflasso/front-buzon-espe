import {combineReducers} from 'redux';
import resourcesReducer from './resourcesReducer';
import userReducer from './userReducer';

export default combineReducers({
    resources: resourcesReducer,
    user: userReducer
});