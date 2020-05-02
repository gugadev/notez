import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listNotes } from './actions';
import { Note } from './components/note';
import { Loader } from '../../components/loader';
import { Store } from '../../lib/entities';
import './notes-list.scss'

export const NotesListContainer = () => {
  const { notes, fetching } = useSelector((state: Store) => ({
    notes: state.listNotes.notes,
    fetching: state.listNotes.fetching
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Fetching notes...');
    dispatch(listNotes());
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
