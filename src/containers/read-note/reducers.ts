import { handleActions } from 'redux-actions';
import { GET_NOTE_FETCHING, GET_NOTE_DONE, GET_NOTE_RESET } from './constants';
import { getNoteState, GetNoteState } from './state';

const fetching = (state: GetNoteState, action: any): GetNoteState => {
  return {
    ...state,
    fetching: action.payload
  };
};

const fetched = (state: GetNoteState, action: any): GetNoteState => {
  return {
    ...state,
    note: action.payload
  };
};

const reset = (state: GetNoteState): GetNoteState => {
  return {
    ...state,
    note: null,
    fetching: false,
    error: null
  };
};

const errorHandler = (state: GetNoteState, action: any): GetNoteState => {
  console.log('Error:', action);
  return {
    ...state,
    fetching: false,
    error: action.payload
  }
}

export const readNoteReducer = handleActions(
  {
    [GET_NOTE_FETCHING]: {
      next: fetching,
      throw: errorHandler
    },
    [GET_NOTE_DONE]: {
      next: fetched,
      throw: errorHandler
    },
    [GET_NOTE_RESET]: {
      next: reset,
      throw: errorHandler
    }
  },
  getNoteState
);
