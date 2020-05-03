import React from 'react';
//@ts-ignore 
import { useNavigate } from 'react-router-dom';
import { timestampToDateString } from '../../../lib/dates';
import { Note as INote } from '../../../lib/entities';
import './note.scss';

export const Note = ({ uid, title, date, content }: INote) => {
  const formattedDate = timestampToDateString(date as number);
  const navigate = useNavigate();

  const readNote = () => {
    navigate(`/notes/${uid}`);
  };

  return (
    <article
      role="button"
      className="app__notesContainer__list__note"
      key={uid}
      onClick={readNote}
    >
      <header className="app__notesContainer__list__note__title">
        <h2 >{title}</h2>
        <p>
          <span>Created at:</span>
          <time dateTime={formattedDate}>
            {formattedDate}
          </time>
        </p>
      </header>
      <section className="app__notesContainer__list__note__content">
        { content }
      </section>
    </article>
  );
};
