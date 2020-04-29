import { combineEpics } from 'redux-observable';
import { notesEpics } from '../containers/notes/notes.epics';

export const rootEpic = combineEpics(notesEpics);
