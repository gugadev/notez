import { ofType, combineEpics } from "redux-observable";
import { of, concat } from "rxjs";
import { switchMap, catchError, map } from "rxjs/operators";
import { CREATE_NOTE } from "./constants";
import { createNoteSending, createNoteDone } from "./actions";
import * as NotesAPI from '../../lib/api';

interface Action {
  type: string;
  payload: any;
}

const createNote = (action$: any) => action$.pipe(
  ofType(CREATE_NOTE),
  switchMap((action: Action) => {
    const sending = of(createNoteSending(true));
    const sendingEnds = of(createNoteSending(false));
    const request = NotesAPI.createNote(action.payload).pipe(
      map(createNoteDone),
      catchError(err => of(createNoteDone(err))),
    );
    return concat(sending, request, sendingEnds);
  })
);

export const createNoteEpics = combineEpics(createNote);
