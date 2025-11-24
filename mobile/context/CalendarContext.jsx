import React, { createContext, useState, useContext } from "react";

// Event Types and Priority labels (constants can be imported separately if preferred)
export const EVENT_TYPES = ["Quiz/Test", "Assignment", "Study"];
export const PRIORITIES = ["Focus First", "Do Soon", "Can Wait"];

// Event Type Colors mapping
export const TYPE_COLORS = {
  "Quiz/Test": "#E17203",
  Assignment: "#FBBF24",
  Study: "#FE9A00",
};

// Create context object
const CalendarContext = createContext();

// Provider component that holds event state and handlers
export function CalendarProvider({ children }) {
  // Events list and modal visibility
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  // Add new event
  const addEvent = (event) => {
    setEvents((prev) => [...prev, { ...event, id: Date.now().toString() }]);
  };

  // Delete an event by id
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  // Open delete modal for event
  const openDeleteModal = (id) => {
    setToDeleteId(id);
    setDeleteModalVisible(true);
  };

  // Confirm delete handler
  const confirmDelete = () => {
    deleteEvent(toDeleteId);
    setToDeleteId(null);
    setDeleteModalVisible(false);
  };

  // Cancel delete handler
  const cancelDelete = () => {
    setToDeleteId(null);
    setDeleteModalVisible(false);
  };

  // Values exposed to context consumers
  const contextValue = {
    events,
    addEvent,
    selectedDate,
    setSelectedDate,
    modalVisible,
    setModalVisible,
    deleteModalVisible,
    openDeleteModal,
    confirmDelete,
    cancelDelete,
    PRIORITIES,
    EVENT_TYPES,
    TYPE_COLORS,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
}

// Hook to use the calendar context easily
export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
