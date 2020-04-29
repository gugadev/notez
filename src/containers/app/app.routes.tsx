import React from 'react';
// @ts-ignore
import { useRoutes } from 'react-router-dom';
import { NotFound } from '../not-found/not-found.component';
import { notesRoutes } from '../notes/notes.routes';
import { Home } from './components/home';

const appRoutes = [
  ...notesRoutes,
  { path: '', element: <Home /> },
  { path: '*', element: <NotFound /> }
];

export const AppRoutes = () => {
  return useRoutes(appRoutes);
};
