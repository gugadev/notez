import React from 'react';
import { NotesContainer } from './notes.container';
import { NotesListContainer } from '../list-notes/notes-list';
import { CreateNoteContainer } from '../create-note/create-note';
import { EditNoteContainer } from '../edit-note/edit-note';
import { ReadNoteContainer } from '../read-note/read-note';

export const notesRoutes = [
  {
    path: 'notes',
    element: <NotesContainer />,
    children: [
      { path: '/', element: <NotesListContainer /> },
      { path: 'create', element: <CreateNoteContainer /> },
      { path: ':id', element: <ReadNoteContainer /> },
      { path: 'edit/:id', element: <EditNoteContainer /> }
    ]
  }
];
