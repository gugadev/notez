export interface Note {
  uid: string;
  title: string;
  date: number;
  content: string;
}

export interface NotesState {
  notesLoading?: boolean;
  getNoteLoading?: boolean;
  createNoteLoading?: boolean;
  updateNoteLoading?: boolean;
  notes?: Note[];
  note?: Note | null;
  error?: Error | null;
}

export const notesState: NotesState = {
  notesLoading: false,
  getNoteLoading: false,
  createNoteLoading: false,
  updateNoteLoading: false,
  notes: [],
  note: null,
  error: null
};
