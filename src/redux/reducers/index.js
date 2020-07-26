import {combineReducers} from 'redux';
import resourcesReducer from './resourcesReducer';

export default combineReducers({
    resources: resourcesReducer
});