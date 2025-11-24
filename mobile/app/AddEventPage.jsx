import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCalendar } from "../context/CalendarContext";
import BackButton from "../components/BackButton";

// Your original color constants for type and priority
const TYPE_COLORS = {
  "Quiz/Test": "#E17203",
  Assignment: "#FBBF24",
  Study: "#FE9A00"
};
const PRIORITY_COLORS = {
  "Focus First": "#FDC600",
  "Do Soon": "#FE9A00",
  "Can Wait": "#A25C30"
};

export default function AddEventPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { selectedDate, addEvent, EVENT_TYPES, PRIORITIES } = useCalendar();
  const date = params.date || selectedDate;

  const [form, setForm] = useState({
    title: "",
    type: EVENT_TYPES[0],
    priority: PRIORITIES[0],
  });

  useEffect(() => {
    setForm({ title: "", type: EVENT_TYPES[0], priority: PRIORITIES[0] });
  }, [date, EVENT_TYPES, PRIORITIES]);

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function saveChanges() {
    if (form.title) {
      addEvent({ ...form, date });
      router.back();
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.backRow}>
        <BackButton />
      </View>
      <Text style={styles.title}>Add Event</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event title..."
        placeholderTextColor="#A25C30"
        value={form.title}
        onChangeText={(v) => updateField("title", v)}
      />

      <Text style={styles.label}>Type</Text>
      <View style={styles.stackedSelectBox}>
        {EVENT_TYPES.map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.stackedOption,
              {
                borderColor: TYPE_COLORS[type],
                backgroundColor: form.type === type ? TYPE_COLORS[type] + "33" : "#F8F8F8"
              }
            ]}
            onPress={() => updateField("type", type)}
            activeOpacity={0.8}
          >
            <View style={[
              styles.radioCircle,
              { borderColor: TYPE_COLORS[type] }
            ]}>
              {form.type === type && <View style={[
                styles.radioSelected,
                { backgroundColor: TYPE_COLORS[type] }
              ]} />}
            </View>
            <Text style={[
              styles.selectText,
              { color: TYPE_COLORS[type] },
              form.type === type && styles.selectedText
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Priority</Text>
      <View style={styles.stackedSelectBox}>
        {PRIORITIES.map(p => (
          <TouchableOpacity
            key={p}
            style={[
              styles.stackedOption,
              {
                borderColor: PRIORITY_COLORS[p],
                backgroundColor: form.priority === p ? PRIORITY_COLORS[p] + "33" : "#F8F8F8"
              }
            ]}
            onPress={() => updateField("priority", p)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.radioCircle,
                { borderColor: PRIORITY_COLORS[p] }
              ]}
            >
              {form.priority === p && <View style={[
                styles.radioSelected,
                { backgroundColor: PRIORITY_COLORS[p] }
              ]} />}
            </View>
            <Text style={[
              styles.selectText,
              { color: PRIORITY_COLORS[p] },
              form.priority === p && styles.selectedText
            ]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveBtn,
            !form.title.trim() && { opacity: 0.65 }
          ]}
          onPress={saveChanges}
          disabled={!form.title.trim()}
        >
          <Text style={styles.saveText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFBF0",
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  backRow: {
    paddingLeft: 0,
    marginBottom: 10,
    marginTop: 0,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#1A1D16",
    marginBottom: 10,
    marginTop: 17,
    marginLeft: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1A1D16",
    marginTop: 15,
    marginLeft: 1,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    padding: 10,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    backgroundColor: "#F8F8F8",
    borderRadius: 7,
    marginTop: 4,
    fontFamily: "Poppins_400Regular",
    color: "#A25C30"
  },
  stackedSelectBox: {
    marginTop: 5,
    marginBottom: 5,
  },
  stackedOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#F8F8F8",
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#fff"
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: "#E17203", // Will be overridden inline for each option
  },
  selectText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular"
  },
  selectedText: {
    fontFamily: "Poppins_600SemiBold",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
    marginBottom: 12,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    padding: 13,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#E1D6B8",
    borderWidth: 2,
  },
  cancelText: {
    color: "#1A1D16",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15
  },
  saveBtn: {
    flex: 1,
    padding: 13,
    backgroundColor: "#FF8927",
    borderRadius: 10,
    alignItems: "center"
  },
  saveText: {
    color: "#FFFBF0",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15
  }
});
