import { createActions } from 'redux-actions';
import {
  UPDATE_NOTE,
  UPDATE_NOTE_FETCHING,
  UPDATE_NOTE_FETCHED,
  UPDATE_NOTE_SENDING,
  UPDATE_NOTE_DONE,
  UPDATE_NOTE_RESET,
  UPDATE_NOTE_FETCH
} from './constants';

export const {
  updateNote,
  updateNoteFetch,
  updateNoteFetching,
  updateNoteFetched,
  updateNoteSending,
  updateNoteDone,
  updateNoteReset
} = createActions(
  {},
  UPDATE_NOTE,
  UPDATE_NOTE_FETCH,
  UPDATE_NOTE_FETCHING,
  UPDATE_NOTE_FETCHED,
  UPDATE_NOTE_SENDING,
  UPDATE_NOTE_DONE,
  UPDATE_NOTE_RESET
);
