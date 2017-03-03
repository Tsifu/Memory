import { combineReducers } from 'redux';
import GiphyReducer from './giphy_reducer';

export default combineReducers ({
  giphy: GiphyReducer
});
