import React from 'react';
// @ts-ignore
import { useRoutes } from 'react-router-dom';
import { appRoutes } from './app.routes';

export const App = () => {
  return useRoutes(appRoutes);
};
