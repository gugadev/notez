import { ofType, combineEpics } from "redux-observable";
import { of, merge } from "rxjs";
import { finalize, switchMap, catchError, map } from "rxjs/operators";
import * as NotesAPI from '../../lib/api';
import { GET_NOTE } from "./constants";
import { getNoteFetching, getNoteDone } from "./actions";

interface Action {
  type: string,
  payload: any
}

const getNote = (action$: any) => action$.pipe(
  ofType(GET_NOTE),
  switchMap((action: Action) => {
    const loading = of(getNoteFetching(true));
    const request = NotesAPI.getNote(action.payload).pipe(
      map(getNoteDone),
      catchError(err => of(getNoteDone(err))),
      finalize(() => of(getNoteFetching(false)))
    );
    return merge(loading, request);
  })
);

export const readNoteEpics = combineEpics(getNote);
