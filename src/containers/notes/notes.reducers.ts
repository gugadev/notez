import { handleActions } from 'redux-actions';
import { NotesState, Note, notesState } from './notes.state';
import clone from 'lodash.clonedeep';
import { FETCH_NOTES_LOADING, FETCH_NOTES_DONE, GET_NOTE_LOADING, GET_NOTE_DONE, CREATE_NOTE_LOADING, CREATE_NOTE_DONE, UPDATE_NOTE_LOADING, UPDATE_NOTE_DONE } from './notes.constants';

/*
 * FETCH NOTES HANDLERS
 */
const fetchNotesLoadingHandler = (state: NotesState, action: any): NotesState => {
  console.log(action);
  return {
    ...state,
    notesLoading: action.payload
  };
};

const fetchNotesDoneHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    notes: action.payload
  };
};

/*
 * GET NOTE HANDLERS
 */
const getNoteLoadingHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    getNoteLoading: action.payload,
  };
};

const getNoteDoneHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    note: action.payload
  };
};

/*
 * CREATE NOTE HANDLERS
 */
const createNoteLoadingHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    createNoteLoading: action.payload,
  };
};

const createNoteDoneHandler = (state: NotesState, action: any): NotesState => {
  const notes: Note[] = clone(state.notes)!;
  notes.push(action.payload);
  return {
    ...state,
    notes
  };
};

/*
 * UPDATE NOTE HANDLERS
 */
const updateNoteLoadingHandler = (state: NotesState, action: any): NotesState => {
  return {
    ...state,
    updateNoteLoading: action.payload,
  };
};

const updateNoteDoneHandler = (state: NotesState, action: any): NotesState => {
  const notes = clone(state.notes)!;
  const noteIndex = notes.findIndex(note => note.uid === action.payload.id);
  notes.splice(noteIndex, 1, action.payload);
  return {
    ...state,
    notes
  };
};

// const removeNoteHandler = (state: any, action: any) => {

// };

const notesErrorHandler = (state: NotesState, action: any) => {
  return {
    ...state,
    error: action.payload
  }
}

export const notesReducers = handleActions(
  {
    [FETCH_NOTES_LOADING]: {
      next: fetchNotesLoadingHandler,
      error: notesErrorHandler
    },
    [FETCH_NOTES_DONE]: {
      next: fetchNotesDoneHandler,
      error: notesErrorHandler
    },
    [GET_NOTE_LOADING]: {
      next: getNoteLoadingHandler,
      error: notesErrorHandler
    },
    [GET_NOTE_DONE]: {
      next: getNoteDoneHandler,
      error: notesErrorHandler
    },
    [CREATE_NOTE_LOADING]: {
      next: createNoteLoadingHandler,
      error: notesErrorHandler
    },
    [CREATE_NOTE_DONE]: {
      next: createNoteDoneHandler,
      error: notesErrorHandler
    },
    [UPDATE_NOTE_LOADING]: {
      next: updateNoteLoadingHandler,
      error: notesErrorHandler
    },
    [UPDATE_NOTE_DONE]: {
      next: updateNoteDoneHandler,
      error: notesErrorHandler
    }
  },
  notesState
);