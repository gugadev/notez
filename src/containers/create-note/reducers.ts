import { handleActions } from 'redux-actions';
import { CreateNoteState, createNoteState } from "./state";
import { CREATE_NOTE_SENDING, CREATE_NOTE_DONE, CREATE_NOTE_RESET } from './constants';

const sending = (state: CreateNoteState, action: any): CreateNoteState => {
  return {
    ...state,
    sending: action.payload
  };
};

const created = (state: CreateNoteState, action: any): CreateNoteState => {
  return {
    ...state,
    createdNote: action.payload
  };
};

const reset = (state: CreateNoteState): CreateNoteState => {
  return {
    ...state,
    createdNote: null,
    sending: false,
    error: null
  };
};

const errorHandler = (state: CreateNoteState, action: any): CreateNoteState => {
  console.log('Error:', action);
  return {
    ...state,
    error: action.payload
  }
};

export const createNoteReducer = handleActions(
  {
    [CREATE_NOTE_SENDING]: {
      next: sending,
      throw: errorHandler
    },
    [CREATE_NOTE_DONE]: {
      next: created,
      throw: errorHandler
    },
    [CREATE_NOTE_RESET]: {
      next: reset,
      throw: errorHandler
    }
  },
  createNoteState
);
