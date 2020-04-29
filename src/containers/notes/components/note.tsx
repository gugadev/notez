import React from 'react';
import { Note as INote } from '../notes.state';

export const Note = ({ uid, title, date, content }: INote) => (
  <article className="app__notesContainer__list__note" key={uid}>
    <header className="app__notesContainer__list__note__title">
      <h2>{title}</h2>
      <time dateTime={date as string}>{date}</time>
    </header>
    <section className="app__notesContainer__list__note__content">
      { content }
    </section>
  </article>
);
