import { createActions } from 'redux-actions';
import { LIST_NOTES, LIST_NOTES_FETCHING, LIST_NOTES_DONE } from './constants';

export const {
  listNotes,
  listNotesFetching,
  listNotesDone
} = createActions(
  {},
  LIST_NOTES,
  LIST_NOTES_FETCHING,
  LIST_NOTES_DONE
)
