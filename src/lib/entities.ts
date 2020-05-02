import { ListNotesState } from "../containers/list-notes/state";
import { GetNoteState } from "../containers/read-note/state";
import { CreateNoteState } from "../containers/create-note/state";
import { EditNoteState } from "../containers/edit-note/state";

export interface Store {
  listNotes: ListNotesState,
  readNote: GetNoteState,
  createNote: CreateNoteState,
  editNote: EditNoteState
};

export interface Note {
  uid: string;
  date: number;
  title: string;
  content: string;
}
