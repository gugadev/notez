import { combineReducers } from 'redux';
import { notesReducers } from '../containers/notes/notes.reducers';

export const rootReducer = combineReducers({
  notes: notesReducers
});
