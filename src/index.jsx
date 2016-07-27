import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Router from './Router';
import setupAWS from './aws';

window.addEventListener('DOMContentLoaded', () => {
  setupAWS();
  const container = document.getElementById('main');

  ReactDOM.render(<Router />, container);
});
