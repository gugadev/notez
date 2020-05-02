import { ofType, combineEpics } from "redux-observable";
import { of, merge } from "rxjs";
import { finalize, switchMap, catchError, map } from "rxjs/operators";
import * as NotesAPI from '../../lib/api';
import { UPDATE_NOTE, UPDATE_NOTE_FETCH } from "./constants";
import { updateNoteFetching, updateNoteFetched, updateNoteSending, updateNoteDone } from "./actions";

interface Action {
  type: string,
  payload: any
}

const updateNoteFetch = (action$: any) => action$.pipe(
  ofType(UPDATE_NOTE_FETCH),
  switchMap((action: Action) => {
    const fetching = of(updateNoteFetching(true));
    const request = NotesAPI.getNote(action.payload.uid).pipe(
      map(updateNoteFetched),
      catchError(err => of(updateNoteFetched(err))),
      finalize(() => of(updateNoteFetching(false)))
    );
    return merge(fetching, request);
  })
);

const updateNote = (action$: any) => action$.pipe(
  ofType(UPDATE_NOTE),
  switchMap((action: Action) => {
    const sending = of(updateNoteSending(true));
    const request = NotesAPI.updateNote(action.payload.uid, action.payload.body).pipe(
      map(updateNoteDone),
      catchError(err => of(updateNoteDone(err))),
      finalize(() => of(updateNoteSending(false)))
    );
    return merge(sending, request);
  })
);

export const updateNoteEpics = combineEpics(updateNoteFetch, updateNote);
