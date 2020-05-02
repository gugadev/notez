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
  UPDATE_NOTE_DONE,
  GET_NOTE_RESET,
  CREATE_NOTE_RESET,
  UPDATE_NOTE_RESET
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

const getNoteReset = (state: NotesState): NotesState => {
  return {
    ...state,
    note: null
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

const createNoteReset = (state: NotesState): NotesState => {
  return {
    ...state,
    note: null
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

const updateNoteReset = (state: NotesState): NotesState => {
  return {
    ...state,
    note: null
  };
};

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
      throw: notesErrorHandler
    },
    [GET_NOTE_RESET]: {
      next: getNoteReset,
      throw: notesErrorHandler
    },
    [CREATE_NOTE_LOADING]: {
      next: createNoteLoadingHandler,
      throw: notesErrorHandler
    },
    [CREATE_NOTE_DONE]: {
      next: createNoteDoneHandler,
      throw: notesErrorHandler
    },
    [CREATE_NOTE_RESET]: {
      next: createNoteReset,
      throw: notesErrorHandler
    },
    [UPDATE_NOTE_LOADING]: {
      next: updateNoteLoadingHandler,
      throw: notesErrorHandler
    },
    [UPDATE_NOTE_DONE]: {
      next: updateNoteDoneHandler,
      throw: notesErrorHandler
    },
    [UPDATE_NOTE_RESET]: {
      next: updateNoteReset,
      throw: notesErrorHandler
    },
  },
  notesState
);
