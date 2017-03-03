import { RECEIVE_GIPHY } from '../actions/giphy_action';

const GiphyReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_GIPHY:
      return action.giphy;
    default:
      return state;
  }
};

export default GiphyReducer;
