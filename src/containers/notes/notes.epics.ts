import { ofType, combineEpics } from "redux-observable";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { FETCH_NOTES_LOADING, GET_NOTE_LOADING, CREATE_NOTE_LOADING, UPDATE_NOTE_LOADING } from "./notes.constants";
import { fetchNotesDone, getNoteDone, createNoteDone, updateNoteDone } from "./notes.actions";
import * as NotesAPI from './notes.api';

interface Action {
  type: string,
  payload: any
}

const fetchNotes = (action$: any) => action$.pipe(
  ofType(FETCH_NOTES_LOADING),
  switchMap(() => 
    NotesAPI.fetchNotes().pipe(
      map(fetchNotesDone),
      catchError(err => of(fetchNotesDone(err)))
    )
  )
);

const getNote = (action$: any) => action$.pipe(
  ofType(GET_NOTE_LOADING),
  switchMap((action: Action) => 
    NotesAPI.getNote(action.payload).pipe(
      map(getNoteDone),
      catchError(err => of(getNoteDone(err)))
    )
  )
);

const createNote = (action$: any) => action$.pipe(
  ofType(CREATE_NOTE_LOADING),
  switchMap((action: Action) => 
    NotesAPI.createNote(action.payload).pipe(
      map(createNoteDone),
      catchError(err => of(createNoteDone(err)))
    )
  )
);

const updateNote = (action$: any) => action$.pipe(
  ofType(UPDATE_NOTE_LOADING),
  switchMap((action: Action) => 
    NotesAPI.updateNote(action.payload.uid, action.payload.body).pipe(
      map(updateNoteDone),
      catchError(err => of(updateNoteDone(err)))
    )
  )
);

const removeNote = (action$: any) => action$.pipe(
  ofType(),
  switchMap((action: Action) => 
    NotesAPI.removeNote(action.payload).pipe(
      map(updateNoteDone),
      catchError(err => of(updateNoteDone(err)))
    )
  )
);

export const notesEpics = combineEpics(
  fetchNotes,
  getNote,
  createNote,
  updateNote,
  removeNote
);
