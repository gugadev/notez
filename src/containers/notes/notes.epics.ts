import { ofType, combineEpics } from "redux-observable";
import { of, merge } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { CREATE_NOTE, FETCH_NOTES, GET_NOTE, UPDATE_NOTE } from "./notes.constants";
import { fetchNotesDone, getNoteDone, createNoteDone, updateNoteDone, createNoteLoading, updateNoteLoading, fetchNotesLoading, getNoteLoading } from "./notes.actions";
import * as NotesAPI from './notes.api';

interface Action {
  type: string,
  payload: any
}

const fetchNotes = (action$: any) => action$.pipe(
  ofType(FETCH_NOTES),
  switchMap(() => {
    const loading = of(fetchNotesLoading());
    const request = NotesAPI.fetchNotes().pipe(
      map(fetchNotesDone),
      catchError(err => of(fetchNotesDone(err)))
    );
    return merge(loading, request);
  })
);

const getNote = (action$: any) => action$.pipe(
  ofType(GET_NOTE),
  switchMap((action: Action) => {
    const loading = of(getNoteLoading());
    const request = NotesAPI.getNote(action.payload).pipe(
      map(getNoteDone),
      catchError(err => of(getNoteDone(err)))
    );
    return merge(loading, request);
  })
);

const createNote = (action$: any) => action$.pipe(
  ofType(CREATE_NOTE),
  switchMap((action: Action) => {
    const loading = of(createNoteLoading());
    const request = NotesAPI.createNote(action.payload).pipe(
      map(createNoteDone),
      catchError(err => of(createNoteDone(err)))
    );
    return merge(loading, request);
  })
);

const updateNote = (action$: any) => action$.pipe(
  ofType(UPDATE_NOTE),
  switchMap((action: Action) => {
    const loading = of(updateNoteLoading());
    const request = NotesAPI.updateNote(action.payload.uid, action.payload.body).pipe(
      map(updateNoteDone),
      catchError(err => of(updateNoteDone(err)))
    );
    return merge(loading, request);
  })
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
)

// export const notesEpics = (action$: any) => merge(
//   fetchNotes(action$),
//   getNote(action$),
//   createNote(action$),
//   updateNote(action$),
//   removeNote(action$)
// );
