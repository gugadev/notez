import { ofType, combineEpics } from "redux-observable";
import { of, concat } from "rxjs";
import { switchMap, catchError, map } from "rxjs/operators";
import { LIST_NOTES } from "./constants";
import { listNotesFetching, listNotesDone } from "./actions";
import * as NotesAPI from '../../lib/api';


const fetchNotes = (action$: any) => action$.pipe(
  ofType(LIST_NOTES),
  switchMap(() => {
    const fetching = of(listNotesFetching(true));
    const fetchingEnds = of(listNotesFetching(false));
    const request = NotesAPI.fetchNotes().pipe(
      map(listNotesDone),
      catchError(err => of(listNotesDone(err)))
    );
    return concat(fetching, request, fetchingEnds);
  })
);

export const listNotesEpics = combineEpics(fetchNotes);
