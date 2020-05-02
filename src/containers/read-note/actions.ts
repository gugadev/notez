import { createActions } from 'redux-actions';
import { GET_NOTE, GET_NOTE_FETCHING, GET_NOTE_DONE, GET_NOTE_RESET } from './constants';

export const {
  getNote,
  getNoteFetching,
  getNoteDone,
  getNoteReset,
} = createActions(
  {},
  GET_NOTE,
  GET_NOTE_FETCHING,
  GET_NOTE_DONE,
  GET_NOTE_RESET
);
