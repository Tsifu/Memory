import React from 'react';
import { Provider } from 'react-redux';
import GameContainer from './game_container';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <GameContainer />
    </Provider>
  )
};

export default Root;
