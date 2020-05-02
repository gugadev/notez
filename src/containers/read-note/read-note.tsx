import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
// @ts-ignore
import { useParams } from 'react-router-dom';
import { NotesState } from '../notes/notes.state';
import { getNote } from '../notes/notes.actions';
import { timestampToDateString } from '../../lib/dates';
import './read-note.scss';

export const ReadNoteContainer = () => {
  const state: NotesState = useSelector((state: Record<string, any>) => state.notes);
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(state);
  const { getNoteLoading, note } = state;
  const formattedDate = timestampToDateString(note?.date || 0);

  useEffect(() => {
    dispatch(getNote(id))
  }, []);

  return (
    <article className="app__notesContainer__readNote">
      {
        getNoteLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <header className="app__notesContainer__readNote__title">
              <h2>{note?.title}</h2>
              <p>
                <span>Created at:</span>
                <time dateTime={formattedDate}>
                  {formattedDate}
                </time>
              </p>
            </header>
            <article className="app__notesContainer__readNote__content">
              <p>{ note?.content }</p>
            </article>
          </>
        )
      }
    </article>
  );
};
