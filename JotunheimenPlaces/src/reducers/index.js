import demographics from './demographics';
import survey from './survey';
import point from './point';
import {combineReducers} from 'redux';

export default combineReducers({
  demographics,
  survey,
  point
});
