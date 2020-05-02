import { ofType, combineEpics } from "redux-observable";
import { of, merge } from "rxjs";
import { finalize, switchMap, catchError, map } from "rxjs/operators";
import { LIST_NOTES } from "./constants";
import { listNotesFetching, listNotesDone } from "./actions";
import * as NotesAPI from '../../lib/api';


export const fetchNotes = (action$: any) => action$.pipe(
  ofType(LIST_NOTES),
  switchMap(() => {
    const loading = of(listNotesFetching(true));
    const request = NotesAPI.fetchNotes().pipe(
      map(listNotesDone),
      catchError(err => of(listNotesDone(err))),
      finalize(() => of(listNotesFetching(false)))
    );
    return merge(loading, request);
  })
);

export const listNotesEpics = combineEpics(fetchNotes);
