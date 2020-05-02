import { Note } from "../../lib/entities";

export interface GetNoteState  {
  note: Note | null;
  fetching: boolean;
  error: Error | null;
}

export const getNoteState: GetNoteState = {
  note: null,
  fetching: false,
  error: null
};
