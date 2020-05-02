import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes } from '../notes/notes.actions';
import { Note as INote } from '../notes/notes.state';
import { Note } from '../notes/components/note';
import './notes-list.scss'

export const NotesListContainer = () => {
  const state = useSelector((state: Record<string, any>) => state.notes);
  const notes: INote[] = state.notes;
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('actual state:', state);
    console.log('Fetching notes...');
    dispatch(fetchNotes());
  }, []);

  return (
    <article className="app__notesContainer__list">
      { notes?.map(note => 
        <Note
          key={note.uid}
          uid={note.uid}
          title={note.title}
          content={note.content}
          date={note.date}
        />
      ) }
    </article>
  );
};
