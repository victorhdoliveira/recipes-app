import { combineReducers } from 'redux';
import drinks from './drink';
import meals from './food';

const rootReducer = combineReducers({
  meals,
  drinks,
});

export default rootReducer;
