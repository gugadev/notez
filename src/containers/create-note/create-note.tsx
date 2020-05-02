import React from 'react';
import { CreateNoteForm } from '../notes/components/create-note-form';
import './create-note.scss';

export const CreateNoteContainer = () => (
  <article className="app__createNoteContainer">
    <header className="app__createNoteContainer__title">
      <h2>Create Note</h2>
    </header>
    <CreateNoteForm />
  </article>
);
