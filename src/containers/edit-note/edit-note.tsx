import React from 'react';
import { EditNoteForm } from './components/edit-note-form';
import './edit-note.scss';


export const EditNoteContainer = () => (
  <article className="app__editNoteContainer">
    <header className="app__editNoteContainer__title">
      <h2>Edit Note</h2>
    </header>
    <EditNoteForm />
  </article>
);
