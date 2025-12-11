import { create } from 'zustand';
import { noteAPI } from '../services/api';

export const useNotesStore = create((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  // Fetch all notes for a user
  fetchNotes: async (userId) => {
    try {
      set({ loading: true, error: null });
      const data = await noteAPI.getNotes(userId);
      set({ notes: data.notes, loading: false });
      return data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      set({
        error: error.response?.data?.message || 'Failed to fetch notes',
        loading: false
      });
      throw error;
    }
  },

  // Create a new note
  createNote: async (userId, title, content, subject) => {
    try {
      set({ loading: true, error: null });
      const data = await noteAPI.createNote(userId, title, content, subject);

      // Add new note to local state
      set((state) => ({
        notes: [data.note, ...state.notes],
        loading: false
      }));

      return data;
    } catch (error) {
      console.error('Error creating note:', error);
      set({
        error: error.response?.data?.message || 'Failed to create note',
        loading: false
      });
      throw error;
    }
  },

  // Update a note
  updateNote: async (noteId, userId, title, content, subject) => {
    try {
      set({ loading: true, error: null });
      const data = await noteAPI.updateNote(noteId, userId, title, content, subject);

      // Update note in local state
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? data.note : note
        ),
        loading: false
      }));

      return data;
    } catch (error) {
      console.error('Error updating note:', error);
      set({
        error: error.response?.data?.message || 'Failed to update note',
        loading: false
      });
      throw error;
    }
  },

  // Delete a note
  deleteNote: async (noteId, userId) => {
    try {
      set({ loading: true, error: null });
      await noteAPI.deleteNote(noteId, userId);

      // Remove note from local state
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
        loading: false
      }));

      return { success: true };
    } catch (error) {
      console.error('Error deleting note:', error);
      set({
        error: error.response?.data?.message || 'Failed to delete note',
        loading: false
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
