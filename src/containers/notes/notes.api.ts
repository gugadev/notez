import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { pluck } from "rxjs/operators";
import { Note } from "./notes.state";

const SERVER_URL = process.env.SERVER_URL as string;

export const fetchNotes = (): Observable<Note[]> => (
  ajax.getJSON(SERVER_URL)
);

export const getNote = (uid: string): Observable<Note> => (
  ajax.getJSON(`${SERVER_URL}/${uid}`)
);

export const createNote = (body: Note): Observable<Note> => (
  ajax.post(SERVER_URL, body).pipe(pluck('response'))
);

export const updateNote = (uid: string, body: Note): Observable<Note> => (
  ajax.put(`${SERVER_URL}/${uid}`, body).pipe(pluck('response'))
);

export const removeNote = (uid: string): Observable<Note> => (
  ajax.put(`${SERVER_URL}/${uid}`).pipe(pluck('response'))
);
