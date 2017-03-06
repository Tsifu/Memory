import * as APIUtil from '../utils/api_util';

export const RECEIVE_GIPHY = 'RECEIVE_GIPHY';
export const REQUEST_GIPHY = 'REQUEST_GIPHY';

export const receiveGiphy = giphy => ({
  type: RECEIVE_GIPHY,
  giphy
});

export const fetchGiphy = () => (
  (dispatch) => {
    APIUtil.fetchGiphy().then(giphy => dispatch(receiveGiphy(giphy)));
  }
);
