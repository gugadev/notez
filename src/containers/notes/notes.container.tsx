import React from 'react';
// @ts-ignore
import { Outlet } from 'react-router-dom';

export const NotesContainer = () => (
  <>
    <article className="app__notesContainer">
      <Outlet />
    </article>
  </>
);
