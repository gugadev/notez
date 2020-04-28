import React from 'react';
import { HomeContainer } from "../home/home.container";
import { notesRoutes } from '../notes/notes.routes';


export const appRoutes = [
  { path: '/', element: <HomeContainer /> },
  ...[notesRoutes]
];
