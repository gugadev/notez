import { ofType } from "redux-observable";
import { of, merge } from "rxjs";
import { finalize, switchMap, catchError, map } from "rxjs/operators";
import * as NotesAPI from '../../lib/api';
import { CREATE_NOTE } from "./constants";
import { createNoteSending, createNoteDone } from "./actions";
import { combineReducers } from "redux";

interface Action {
  type: string,
  payload: any
}

const createNote = (action$: any) => action$.pipe(
  ofType(CREATE_NOTE),
  switchMap((action: Action) => {
    const sending = of(createNoteSending(true));
    const request = NotesAPI.createNote(action.payload).pipe(
      map(createNoteDone),
      catchError(err => of(createNoteDone(err))),
      finalize(() => of(createNoteSending(true)))
    );
    return merge(sending, request);
  })
);

export const createNoteEpics = combineReducers(createNote);
