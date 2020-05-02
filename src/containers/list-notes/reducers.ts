import { handleActions } from 'redux-actions';
import { LIST_NOTES_FETCHING, LIST_NOTES_DONE } from './constants';
import { ListNotesState, listNotesState } from './state';

const fetching = (state: ListNotesState, action: any): ListNotesState => {
  return {
    ...state,
    fetching: true
  };
};

const fetched = (state: ListNotesState, action: any): ListNotesState => {
  return {
    ...state,
    notes: action.payload
  };
};

const errorHandler = (state: ListNotesState, action: any) => {
  console.log('Error:', action);
  return {
    ...state,
    error: action.payload,
    fetching: false,
  }
}

export const listNotesReducer = handleActions(
  {
    [LIST_NOTES_FETCHING]: {
      next: fetching,
      throw: errorHandler
    },
    [LIST_NOTES_DONE]: {
      next: fetched,
      throw: errorHandler
    }
  },
  listNotesState
);
