import { combineReducers } from 'redux';
import { homeReducers } from '../containers/home/home.reducers';
import { notesReducers } from '../containers/notes/notes.reducers';

export const rootReducer = combineReducers({
  home: homeReducers,
  notes: notesReducers
});
