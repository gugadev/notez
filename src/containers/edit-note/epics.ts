import { ofType, combineEpics } from "redux-observable";
import { of, concat } from "rxjs";
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
    const fetchingEnds = of(updateNoteFetching(false));
    const request = NotesAPI.getNote(action.payload).pipe(
      map(updateNoteFetched),
      catchError(err => of(updateNoteFetched(err))),
    );
    return concat(fetching, request, fetchingEnds);
  })
);

const updateNote = (action$: any) => action$.pipe(
  ofType(UPDATE_NOTE),
  switchMap((action: Action) => {
    const sending = of(updateNoteSending(true));
    const sendingEnds = of(updateNoteSending(false));
    const request = NotesAPI.updateNote(action.payload.uid, action.payload).pipe(
      map(updateNoteDone),
      catchError(err => of(updateNoteDone(err))),
    );
    return concat(sending, request, sendingEnds);
  })
);

export const updateNoteEpics = combineEpics(updateNoteFetch, updateNote);
