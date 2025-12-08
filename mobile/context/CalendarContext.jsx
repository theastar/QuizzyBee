import React, { createContext, useState, useContext, useEffect } from "react";
import { calendarAPI } from "../services/api";
import { useAuthStore } from "./AuthStore";

// Event Types and Priority labels (constants can be imported separately if preferred)
export const EVENT_TYPES = ["Quiz/Test", "Assignment", "Study"];
export const PRIORITIES = ["Focus First", "Do Soon", "Can Wait"];

// Event Type Colors mapping
export const TYPE_COLORS = {
  "Quiz/Test": "#E17203",
  Assignment: "#FBBF24",
  Study: "#FE9A00",
};

// Priority Colors mapping
export const PRIORITY_COLORS = {
  "Focus First": "#FDC600",
  "Do Soon": "#FE9A00",
  "Can Wait": "#A25C30"
};

// Create context object
const CalendarContext = createContext();

// Provider component that holds event state and handlers
export function CalendarProvider({ children }) {
  const { user } = useAuthStore();

  // Events list and modal visibility
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch events when user logs in
  useEffect(() => {
    if (user?._id) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [user?._id]);

  // Fetch all events from backend
  const fetchEvents = async () => {
    if (!user?._id) return;

    try {
      setIsLoading(true);
      const response = await calendarAPI.getEvents(user._id);
      if (response.success) {
        setEvents(response.events);
      }
    } catch (error) {
      console.log("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new event
  const addEvent = async (event) => {
    if (!user?._id) {
      console.log("No user logged in");
      return;
    }

    try {
      const response = await calendarAPI.createEvent(
        user._id,
        event.title,
        event.type,
        event.priority,
        event.date
      );

      if (response.success) {
        setEvents((prev) => [...prev, response.event]);
      }
    } catch (error) {
      console.log("Error adding event:", error);
    }
  };

  // Delete an event by id
  const deleteEvent = async (id) => {
    if (!user?._id) {
      console.log("No user logged in");
      return;
    }

    try {
      const response = await calendarAPI.deleteEvent(id, user._id);

      if (response.success) {
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
      }
    } catch (error) {
      console.log("Error deleting event:", error);
    }
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
    isLoading,
    fetchEvents,
    PRIORITIES,
    EVENT_TYPES,
    TYPE_COLORS,
    PRIORITY_COLORS,
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
