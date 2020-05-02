import { Note } from "../../lib/entities";

export interface ListNotesState {
  notes: Note[];
  fetching: boolean;
  error: Error | null;
}

export const listNotesState: ListNotesState = {
  notes: [],
  fetching: false,
  error: null
};
