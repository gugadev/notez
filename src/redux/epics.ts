import { combineEpics } from 'redux-observable';
import { homeEpics } from '../containers/home/home.epics';
import { notesEpics } from '../containers/notes/notes.epics';

export const rootEpic = combineEpics(homeEpics, notesEpics);
