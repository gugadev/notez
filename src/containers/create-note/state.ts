import { Note } from "../../lib/entities";

export interface CreateNoteState {
  createdNote: Note | null;
  sending: boolean;
  error: Error | null;
}

export const createNoteState: CreateNoteState = {
  createdNote: null,
  sending: false,
  error: null
};