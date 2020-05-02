import { Note } from "../../lib/entities";

export interface EditNoteState {
  fetching: boolean;
  note: Note | null;
  updatedNote: Note | null;
  sending: boolean;
  error?: Error | null;
};

export const editNoteState: EditNoteState = {
  note: null,
  updatedNote: null,
  fetching: false,
  sending: false,
  error: null
};
