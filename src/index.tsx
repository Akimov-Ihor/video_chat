import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { VideoChatApplication } from './components/VideoChatApplication';

ReactDOM.render(
  <BrowserRouter>
    <VideoChatApplication />
  </BrowserRouter>,
  document.getElementById('root'),
);
