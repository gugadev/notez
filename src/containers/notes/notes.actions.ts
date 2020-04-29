import { createActions } from 'redux-actions';
import {
  FETCH_NOTES_LOADING,
  FETCH_NOTES_DONE,
  FETCH_NOTES_ERROR,
  GET_NOTE_LOADING,
  GET_NOTE_DONE,
  GET_NOTE_ERROR,
  CREATE_NOTE_LOADING,
  CREATE_NOTE_DONE,
  CREATE_NOTE_ERROR,
  UPDATE_NOTE_LOADING,
  UPDATE_NOTE_DONE,
  UPDATE_NOTE_ERROR,
  REMOVE_NOTE_LOADING,
  REMOVE_NOTE_DONE,
  REMOVE_NOTE_ERROR
} from './notes.constants';

export const {
  fetchNotesLoading,
  fetchNotesDone,
  fetchNotesError,
  getNoteLoading,
  getNoteDone,
  getNoteError,
  createNoteLoading,
  createNoteDone,
  createNoteError,
  updateNoteLoading,
  updateNoteDone,
  updateNoteError,
  removeNoteLoading,
  removeNoteDone,
  removeNoteError
} = createActions(
  {},
  FETCH_NOTES_LOADING,
  FETCH_NOTES_DONE,
  FETCH_NOTES_ERROR,
  GET_NOTE_LOADING,
  GET_NOTE_DONE,
  GET_NOTE_ERROR,
  CREATE_NOTE_LOADING,
  CREATE_NOTE_DONE,
  CREATE_NOTE_ERROR,
  UPDATE_NOTE_LOADING,
  UPDATE_NOTE_DONE,
  UPDATE_NOTE_ERROR,
  REMOVE_NOTE_LOADING,
  REMOVE_NOTE_DONE,
  REMOVE_NOTE_ERROR
);
