import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import Modal from 'react-modal';
import configureStore from './store/store';

import { fetchGif } from './utils/api_util';
window.fetchGif = fetchGif;

document.addEventListener("DOMContentLoaded", () => {
  Modal.setAppElement(document.body);
  const main = document.getElementById('main');
  const store = configureStore();
  window.store = store;
  ReactDOM.render(<Root store={store} />, main);
});
