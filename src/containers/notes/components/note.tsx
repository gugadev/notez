import React from 'react';
import { Note as INote } from '../notes.state';
import './note.scss';

const dateTimeToText = (dateTime: number) => {
  const dt = new Date(dateTime);
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const day = dt.getDate();
  const hour = dt.getHours();
  const minutes = dt.getMinutes();
  return `${day}/${month}/${year} ${hour}:${minutes}`;
};

export const Note = ({ uid, title, date, content }: INote) => (
  <article className="app__notesContainer__list__note" key={uid}>
    <header className="app__notesContainer__list__note__title">
      <h2>{title}</h2>
      <p>
        <span>Creado el:</span>
        <time dateTime={date.toString()}>{dateTimeToText(date as number)}</time>
      </p>
    </header>
    <section className="app__notesContainer__list__note__content">
      { content }
    </section>
  </article>
);
