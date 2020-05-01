import { handleActions } from 'redux-actions';
import clone from 'lodash.clonedeep';
import { NotesState, Note, notesState } from './notes.state';
import {
  FETCH_NOTES_LOADING,
  FETCH_NOTES_DONE,
  GET_NOTE_LOADING,
  GET_NOTE_DONE,
  CREATE_NOTE_LOADING,
  CREATE_NOTE_DONE,
  UPDATE_NOTE_LOADING,
  UPDATE_NOTE_DONE
} from './notes.constants';

/*
 * FETCH NOTES HANDLERS
 */
const fetchNotesLoadingHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    notesLoading: true
  };
};

const fetchNotesDoneHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    notes: action.payload,
    notesLoading: false
  };
};

/*
 * GET NOTE HANDLERS
 */
const getNoteLoadingHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    getNoteLoading: true
  };
};

const getNoteDoneHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    note: action.payload,
    getNoteLoading: false
  };
};

/*
 * CREATE NOTE HANDLERS
 */
const createNoteLoadingHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    createNoteLoading: true
  };
};

const createNoteDoneHandler = (state: NotesState, action: any): NotesState => {
  const notes: Note[] = clone(state.notes)!;
  notes.push(action.payload);
  return {
    ...state,
    createNoteLoading: false,
    notes,
    note: action.payload
  };
};

/*
 * UPDATE NOTE HANDLERS
 */
const updateNoteLoadingHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    updateNoteLoading: true,
  };
};

const updateNoteDoneHandler = (state: NotesState, action: any): NotesState => {
  const notes = clone(state.notes)!;
  const noteIndex = notes.findIndex(note => note.uid === action.payload.id);
  notes.splice(noteIndex, 1, action.payload);
  return {
    ...state,
    updateNoteLoading: false,
    notes
  };
};

// const removeNoteHandler = (state: any, action: any) => {

// };

const notesErrorHandler = (state: NotesState, action: any) => {
  console.log('Error:', action);
  return {
    ...state,
    error: action.payload
  }
}

export const notesReducers = handleActions(
  {
    [FETCH_NOTES_LOADING]: {
      next: fetchNotesLoadingHandler,
      throw: notesErrorHandler
    },
    [FETCH_NOTES_DONE]: {
      next: fetchNotesDoneHandler,
      throw: notesErrorHandler
    },
    [GET_NOTE_LOADING]: {
      next: getNoteLoadingHandler,
      throw: notesErrorHandler
    },
    [GET_NOTE_DONE]: {
      next: getNoteDoneHandler,
      error: notesErrorHandler
    },
    [CREATE_NOTE_LOADING]: {
      next: createNoteLoadingHandler,
      throw: notesErrorHandler
    },
    [CREATE_NOTE_DONE]: {
      next: createNoteDoneHandler,
      throw: notesErrorHandler
    },
    [UPDATE_NOTE_LOADING]: {
      next: updateNoteLoadingHandler,
      throw: notesErrorHandler
    },
    [UPDATE_NOTE_DONE]: {
      next: updateNoteDoneHandler,
      throw: notesErrorHandler
    }
  },
  notesState
);
