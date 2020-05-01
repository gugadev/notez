import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes } from '../notes/notes.actions';
import { Note } from '../notes/components/note';
import './notes-list.container.scss'

export const NotesListContainer = () => {
  const state = useSelector((state: Record<string, any>) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('actual state:', state);
    console.log('Fetching notes...');
    dispatch(fetchNotes());
  }, []);

  return (
    <article className="app__notesContainer__list">
      { state!.notes!.map(Note) }
    </article>
  );
};