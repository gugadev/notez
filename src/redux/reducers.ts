import { combineReducers } from 'redux';
import { listNotesReducer } from './../containers/list-notes/reducers';
import { readNoteReducer } from './../containers/read-note/reducers';
import { createNoteReducer } from './../containers/create-note/reducers';
import { editNoteReducer } from './../containers/edit-note/reducers';

export const rootReducer = combineReducers({
  listNotes: listNotesReducer,
  readNote: readNoteReducer,
  createNote: createNoteReducer,
  editNote: editNoteReducer
});
