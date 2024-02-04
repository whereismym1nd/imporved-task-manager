import React from 'react';
import './index.css';
import 'react-day-picker/dist/style.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

