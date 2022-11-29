import { combineReducers } from 'redux';
import food from './food';
import drink from './drink';

const rootReducer = combineReducers({
  food,
  drink,
});

export default rootReducer;
