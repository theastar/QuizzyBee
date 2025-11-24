import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

function AddEventModal({ visible, onClose, onSave, eventTypes, priorities }) {
  const [form, setForm] = useState({
    title: "",
    type: eventTypes[0],
    priority: priorities[0],
  });

  useEffect(() => {
    setForm({
      title: "",
      type: eventTypes[0],
      priority: priorities[0],
    });
  }, [visible, eventTypes, priorities]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function saveChanges() {
    if (form.title) {
      onSave(form);
      onClose();
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Add New Event</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={26} color="#A25C30" />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event title..."
            placeholderTextColor="#A25C30"
            value={form.title}
            onChangeText={(v) => updateField("title", v)}
          />

          <Text style={styles.label}>Type</Text>
          <View style={styles.selectBox}>
            {eventTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.selectOption,
                  {
                    borderColor: TYPE_COLORS[type],
                    backgroundColor: form.type === type ? TYPE_COLORS[type] + "33" : "#F8F8F8",
                  },
                ]}
                onPress={() => updateField("type", type)}
              >
                <Text
                  style={[
                    styles.selectText,
                    { color: TYPE_COLORS[type] },
                    form.type === type && styles.selectedText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Priority</Text>
          <View style={styles.selectBox}>
            {priorities.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.selectOption,
                  {
                    borderColor: PRIORITY_COLORS[p],
                    backgroundColor: form.priority === p ? PRIORITY_COLORS[p] + "33" : "#F8F8F8",
                  },
                ]}
                onPress={() => updateField("priority", p)}
              >
                <Text
                  style={[
                    styles.selectText,
                    { color: PRIORITY_COLORS[p] },
                    form.priority === p && styles.selectedText,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveBtn, !form.title.trim() && { opacity: 0.65 }]}
              onPress={saveChanges}
              disabled={!form.title.trim()}
            >
              <Text style={styles.saveText}>Add Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddEventModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.18)", justifyContent: "center", alignItems: "center" },
  modalBox: {
    width: 340,
    height: 410,
    borderRadius: 18,
    backgroundColor: "#FFFBF0",
    borderColor: "#FDEBA1",
    borderWidth: 3,
    padding: 16,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  headerRow: {
    width: "100%",
    alignItems: "center",
    marginBottom: 6,
    position: "relative",
    minHeight: 35,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#1A1D16",
    textAlign: "center",
    width: "100%",
  },
  closeBtn: { position: "absolute", right: 0, top: 0, padding: 2 },
  label: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1A1D16",
    marginTop: 7,
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
    color: "#A25C30",
  },
  selectBox: {
    flexDirection: "row",
    marginTop: 4,
    gap: 5,
    justifyContent: "space-between",
  },
  selectOption: {
    padding: 4,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 95,
    marginBottom: 8,
  },
  selectText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  selectedText: {
    fontFamily: "Poppins_600SemiBold",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  cancelBtn: {
    flex: 1,
    padding: 8,
    backgroundColor: "#D4D4D4",
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  cancelText: {
    color: "#1A1D16",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  saveBtn: {
    flex: 1,
    padding: 8,
    backgroundColor: "#FF8927",
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#FFFBF0",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});
