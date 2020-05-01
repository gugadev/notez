import React from 'react';
import './create-note.container.scss';
import { CreateNoteForm } from '../notes/components/create-note-form';

export const CreateNoteContainer = () => (
  <article className="app__createNoteContainer">
    <header className="app__createNoteContainer__title">
      <h2>Create Note</h2>
    </header>
    <CreateNoteForm />
  </article>
);
