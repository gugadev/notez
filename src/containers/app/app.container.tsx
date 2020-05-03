import React from 'react';
import { Provider } from 'react-redux';
// @ts-ignore
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app.routes';
import { AppHeader } from './components/header';
import store from '../../redux/store';
import './app.container.scss';
import { AnimatePresence } from 'framer-motion';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <article className="app">
          <AppHeader />
          <AnimatePresence>
            <AppRoutes />
          </AnimatePresence>
        </article>
      </BrowserRouter>
    </Provider>
  );
};
