import React from 'react';
import { Provider } from 'react-redux';
// @ts-ignore
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app.routes';
import { AppHeader } from './components/header';
import store from '../../redux/store';
import './app.container.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <article className="app">
          <AppHeader />
          <AppRoutes />
        </article>
      </BrowserRouter>
    </Provider>
  );
};
