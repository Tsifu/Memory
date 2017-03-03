import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import Modal from 'react-modal';


document.addEventListener("DOMContentLoaded", () => {
  Modal.setAppElement(document.body);
  const main = document.getElementById('main');
  ReactDOM.render(<Game />, main);
});
