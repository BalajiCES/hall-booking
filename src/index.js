import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configure-store';
import AppRoutes from './router/app-routes';

// configure store
const store = configureStore;

// Providing Store to Top Level Component
ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('root')
);
