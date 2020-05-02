import { createActions } from 'redux-actions';
import { CREATE_NOTE, CREATE_NOTE_SENDING, CREATE_NOTE_DONE, CREATE_NOTE_RESET } from './constants';
export const {
  createNote,
  createNoteSending,
  createNoteDone,
  createNoteReset
} = createActions(
  {},
  CREATE_NOTE,
  CREATE_NOTE_SENDING,
  CREATE_NOTE_DONE,
  CREATE_NOTE_RESET
);
