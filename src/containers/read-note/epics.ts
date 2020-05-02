import { ofType, combineEpics } from "redux-observable";
import { of, concat } from "rxjs";
import { switchMap, catchError, map } from "rxjs/operators";
import { GET_NOTE } from "./constants";
import { getNoteFetching, getNoteDone } from "./actions";
import * as NotesAPI from '../../lib/api';

interface Action {
  type: string,
  payload: any
}

const getNote = (action$: any) => action$.pipe(
  ofType(GET_NOTE),
  switchMap((action: Action) => {
    const fetching = of(getNoteFetching(true));
    const fetchingEnds = of(getNoteFetching(false));
    const request = NotesAPI.getNote(action.payload).pipe(
      map(getNoteDone),
      catchError(err => of(getNoteDone(err)))
    );
    return concat(fetching, request, fetchingEnds);
  })
);

export const readNoteEpics = combineEpics(getNote);
