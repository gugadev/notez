import { combineEpics } from 'redux-observable';
import { listNotesEpics } from './../containers/list-notes/epics';
import { readNoteEpics } from './../containers/read-note/epics';
import { createNoteEpics } from '../containers/create-note/epics';
import { updateNoteEpics } from '../containers/edit-note/epics';

export const rootEpic = combineEpics(
  listNotesEpics,
  readNoteEpics,
  createNoteEpics,
  // updateNoteEpics
);
