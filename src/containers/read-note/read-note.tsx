import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
// @ts-ignore
import { useParams, useNavigate } from 'react-router-dom';
import { NotesState } from '../notes/notes.state';
import { getNote, getNoteReset } from '../notes/notes.actions';
import { timestampToDateString } from '../../lib/dates';
import { Button } from '../../components/button';
import { Loader } from '../../components/loader';
import './read-note.scss';

export const ReadNoteContainer = () => {
  const state: NotesState = useSelector((state: Record<string, any>) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { getNoteLoading, note } = state;
  const formattedDate = timestampToDateString(note?.date || 0);

  const goToEdit = () => {
    navigate(`/notes/edit/${id}`);
  };

  useEffect(() => {
    dispatch(getNote(id))

    return () => {
      dispatch(getNoteReset());
    }
  }, []);

  return (
    <article className="app__notesContainer__readNote">
      {
        getNoteLoading ? (
          <Loader show />
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
              <Button kind="primary" onClick={goToEdit}>Edit</Button>
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
