import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import DeleteModal from "../../components/DeleteModal";
import { useCalendar } from "../../context/CalendarContext";
import { useRouter } from "expo-router";

function CalendarPage() {
  // Consume calendar context
  const {
    events,
    selectedDate,
    setSelectedDate,
    deleteModalVisible,
    openDeleteModal,
    confirmDelete,
    cancelDelete,
    EVENT_TYPES,
    PRIORITIES,
    TYPE_COLORS,
  } = useCalendar();

  // Prepare marked dates for calendar UI
  const markDates = {};
  events.forEach((ev) => {
    markDates[ev.date] = { marked: true, dotColor: "#FFA000" };
  });
  if (selectedDate) {
    markDates[selectedDate] = {
      ...(markDates[selectedDate] || {}),
      selected: true,
      selectedColor: "#FDEBA1"
    };
  }

  // Handlers for UI actions
  const router = useRouter();
  const handleAddEvent = () => {
    router.push(`/AddEventPage?date=${selectedDate}`);
  };

  const handleDeletePress = (id) => openDeleteModal(id);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      {/* Back button */}
      <View style={styles.backButtonRow}>
        <BackButton />
      </View>

      {/* Add event button */}
      <View style={styles.addRow}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddEvent}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.addBtnText}>Add Event</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar component */}
      <View style={styles.calendarCard}>
        <Calendar
          style={styles.calendar}
          current={selectedDate}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markDates}
          theme={{
            calendarBackground: "#FFFBF0",
            todayTextColor: "#FEC200",
            selectedDayBackgroundColor: "#FDEBA1",
            selectedDayTextColor: "#F57F17",
            arrowColor: "#FE9000",
            monthTextColor: "#1A1D16",
            dayTextColor: "#583C19",
            textDayFontFamily: "Poppins-Regular",
            textMonthFontFamily: "Poppins-SemiBold",
            textDayHeaderFontFamily: "Poppins-SemiBold"
          }}
        />
      </View>

      {/* Event types legend */}
      <View style={styles.infoCard}>
        <Text style={styles.cardHeader}>Event Types</Text>
        <View style={styles.cardListRow}>
          {EVENT_TYPES.map(type => (
            <View key={type} style={styles.cardListItem}>
              <View style={[styles.typeDot, { backgroundColor: TYPE_COLORS[type] }]} />
              <Text style={styles.cardLabel}>{type}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Upcoming events */}
      <View style={styles.eventsCard}>
        <Text style={styles.cardHeader}>Upcoming Events</Text>
        {events
          .filter(ev => !selectedDate || ev.date === selectedDate)
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, 5)
          .map(item => (
            <View key={item.id} style={styles.eventItemOuter}>
              <View style={styles.eventItemMain}>
                <View style={styles.eventDotSection}>
                  <View style={[
                    styles.eventDot,
                    { backgroundColor: TYPE_COLORS[item.type] }
                  ]} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventDate}>
                    {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </Text>
                  <View style={[
                    styles.priorityTag,
                    { borderColor: "#FDC600", backgroundColor: "#FFF9D5" }
                  ]}>
                    <Text style={[
                      styles.priorityText,
                      { color: "#E17203" }
                    ]}>{item.priority}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeletePress(item.id)}
                  style={styles.deleteButton}
                  hitSlop={8}
                >
                  <Ionicons name="trash" size={18} color="#E17203" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        {events.filter(ev => !selectedDate || ev.date === selectedDate).length === 0 && (
          <Text style={styles.noEventsText}>No events yet.</Text>
        )}
      </View>
      
      {/* Delete Modal */}
      <DeleteModal
        visible={deleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </ScrollView>
  );
}

export default CalendarPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFBF0",
    paddingHorizontal: 10,
    paddingTop: 35,
  },
  backButtonRow: {
    paddingLeft: 10,
    paddingTop: 1,
    paddingBottom: 10,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  addBtn: {
    flexDirection: "row",
    backgroundColor: "#FE9A00",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 13,
    elevation: 2,
    shadowColor: "#FABF41",
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  addBtnText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
    fontFamily: "Poppins_600SemiBold"
  },
  calendarCard: {
    backgroundColor: "#FFFF",
    borderColor: "#FDEBA1",
    borderRadius: 20,
    borderWidth: 3,
    marginTop: 10,
    marginBottom: 20,
    elevation: 1,
    padding: 10,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  calendar: {
    borderRadius: 12,
    backgroundColor: "#FFFF",
    height: 370,
    width: 320
  },
  infoCard: {
    backgroundColor: "#FFFF",
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "#FDEBA1",
    padding: 18,
    marginVertical: 12,
    marginHorizontal: 2,
    shadowColor: "#FFE299",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1
  },
  cardHeader: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1A1D16",
    marginBottom: 13,
    marginLeft: 2
  },
  cardListRow: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
    justifyContent: "space-around"
  },
  cardListItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    minWidth: 78
  },
  typeDot: {
    width: 13,
    height: 13,
    borderRadius: 9,
    marginRight: 5,
  },
  cardLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#1A1D16",
  },
  eventsCard: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#FDEBA1",
    borderRadius: 20,
    padding: 18,
    marginVertical: 12,
    minHeight: 80,
    elevation: 1,
    shadowColor: "#FFE299",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  eventItemOuter: {
    borderWidth: 2,
    borderColor: "#FDEBA1",
    borderRadius: 14,
    backgroundColor: "#FFFF",
    padding: 0,
    marginVertical: 8,
  },
  eventItemMain: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 13,
  },
  eventDotSection: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 10,
    paddingTop: 7,
  },
  eventDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#E17203"
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#232323",
    marginBottom: 2,
  },
  eventDate: {
    fontSize: 14,
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    marginBottom: 7,
  },
  priorityTag: {
    alignSelf: "flex-start",
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 18,
    marginTop: 2,
    marginBottom: 4,
  },
  priorityText: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
  deleteButton: {
    alignSelf: "flex-start",
    marginLeft: 12,
    marginTop: 2
  },
  noEventsText: {
    color: "#99742c",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: 13,
  }
});
