import { combineReducers } from 'redux';
import studentReducer from './StudentReducer';

export default combineReducers({
  students: studentReducer
});
