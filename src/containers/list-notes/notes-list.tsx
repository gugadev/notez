import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotes } from './actions';
import { Note as INote, ListNotesState } from './state';
import { Note } from './components/note';
import { Loader } from '../../components/loader';
import './notes-list.scss'

export const NotesListContainer = () => {
  const state: ListNotesState = useSelector((state: Record<string, any>) => state.notes);
  const { notes, fetching } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('actual state:', state);
    console.log('Fetching notes...');
    dispatch(fetchNotes());
  }, []);

  return (
    <article className="app__notesContainer__list">
      { fetching ? (
        <Loader show />
      ) : <>
        { notes?.map(note => 
          <Note
            key={note.uid}
            uid={note.uid}
            title={note.title}
            content={note.content}
            date={note.date}
          />
        ) }
      </> }
    </article>
  );
};
