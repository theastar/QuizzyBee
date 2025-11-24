import React, { createContext, useState } from "react";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => setNotes((prev) => [...prev, note]);
  const deleteNote = (id) => setNotes((prev) => prev.filter(n => n.id !== id));

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}
