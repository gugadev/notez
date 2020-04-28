import React from 'react';
import { NotesContainer } from './notes.container';
import { NotesListContainer } from './list/notes-list.container';
import { CreateNoteContainer } from './create/create-note.container';
import { EditNoteContainer } from './edit/edit-note.container';

export const notesRoutes = [{
  path: 'notes',
  element: <NotesContainer />,
  children: [
    { path: '/', element: <NotesListContainer /> },
    { path: '/create', element: <CreateNoteContainer /> },
    { path: ':id', element: <EditNoteContainer /> }
  ]
}];
