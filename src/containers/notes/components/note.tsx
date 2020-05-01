import React from 'react';
//@ts-ignore 
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Note as INote } from '../notes.state';
import './note.scss';

const timestampToDateString = (timestamp: number) => {
  return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
};

export const Note = ({ uid, title, date, content }: INote) => {
  const navigate = useNavigate();
  const formattedDate = timestampToDateString(date as number);

  const readNote = () => {
    navigate(`/notes/${uid}`);
  };

  return (
    <article className="app__notesContainer__list__note" key={uid}>
      <header className="app__notesContainer__list__note__title">
        <h2 onClick={readNote}>{title}</h2>
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
