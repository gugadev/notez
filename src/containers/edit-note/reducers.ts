import { handleActions } from 'redux-actions';
import { UPDATE_NOTE_FETCHING, UPDATE_NOTE_DONE, UPDATE_NOTE_RESET, UPDATE_NOTE_FETCHED, UPDATE_NOTE_SENDING, UPDATE_NOTE } from './constants';
import { EditNoteState, editNoteState } from './state';

const fetching = (state: EditNoteState, action: any): EditNoteState => {
  return {
    ...state,
    fetching: action.payload,
  };
};

const fetched = (state: EditNoteState, action: any): EditNoteState => {
  return {
    ...state,
    note: action.payload
  };
};

const sending = (state: EditNoteState, action: any): EditNoteState => {
  return {
    ...state,
    sending: action.payload
  };
};

const updated = (state: EditNoteState, action: any): EditNoteState => {
  return {
    ...state,
    updatedNote: action.payload
  };
};

const reset = (state: EditNoteState): EditNoteState => {
  return {
    ...state,
    note: null,
    updatedNote: null,
    fetching: false,
    sending: false
  };
};

const errorHandler = (state: EditNoteState, action: any): EditNoteState => {
  console.log('Error:', action);
  return {
    ...state,
    fetching: false,
    sending: false,
    error: action.payload
  }
};

export const editNoteReducer = handleActions(
  {
    [UPDATE_NOTE]: {
      next: state => state,
      throw: errorHandler
    },
    [UPDATE_NOTE_FETCHING]: {
      next: fetching,
      throw: errorHandler
    },
    [UPDATE_NOTE_FETCHED]: {
      next: fetched,
      throw: errorHandler
    },
    [UPDATE_NOTE_SENDING]: {
      next: sending,
      throw: errorHandler,
    },
    [UPDATE_NOTE_DONE]: {
      next: updated,
      throw: errorHandler
    },
    [UPDATE_NOTE_RESET]: {
      next: reset,
      throw: errorHandler
    },
  },
  editNoteState
);