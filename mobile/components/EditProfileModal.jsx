import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Modal component for editing profile details
function EditProfileModal({ visible, onClose, profile, setProfile }) {
  const [form, setForm] = useState(profile);

  useEffect(() => {
    setForm(profile);
  }, [profile, visible]);

  function saveChanges() {
    setProfile(form);
    onClose();
  }

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Edit Profile Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={26} color="#A25C30" />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#A25C30"
            value={form.name}
            onChangeText={v => updateField("name", v)}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A25C30"
            value={form.email}
            onChangeText={v => updateField("email", v)}
          />
          <Text style={styles.label}>Student ID</Text>
          <TextInput
            style={[styles.input, styles.idInput]}
            editable={false}
            value={form.id}
            placeholder="Student ID"
            placeholderTextColor="#A25C30"
          />
          <Text style={styles.label}>Course / Department (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Course / Department"
            placeholderTextColor="#808080"
            value={form.course}
            onChangeText={v => updateField("course", v)}
          />
          <Text style={styles.label}>Year Level / Section (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Year Level / Section"
            placeholderTextColor="#808080"
            value={form.year}
            onChangeText={v => updateField("year", v)}
          />
          <Text style={styles.label}>Bio (Optional)</Text>
          <TextInput
            style={[styles.input, { minHeight: 48 }]}
            placeholder="Bio"
            placeholderTextColor="#808080"
            value={form.bio}
            onChangeText={v => updateField("bio", v)}
            multiline
          />
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default EditProfileModal;

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    backgroundColor:"rgba(0,0,0,0.3)",
    justifyContent:"center",
    alignItems:"center"
  },
  modalBox: {
    width: "90%",
    borderRadius: 18,
    backgroundColor: "#FFFBF0",
    borderColor: "#FDEBA1",
    borderWidth: 3,
    padding: 18,
  },
  headerRow: {
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
    minHeight: 35,
    justifyContent: "center"
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1A1D16",
    textAlign: "center",
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 2,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#1A1D16",
    marginTop: 10
  },
  input: {
    fontSize: 14,
    padding: 10,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    marginTop: 4,
    fontFamily: "Poppins_400Regular",
    color: "#A25C30",
  },
  idInput: {
    backgroundColor: "#D4D4D4",
    color: "#A25C30",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  cancelBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#D4D4D4",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  cancelText: {
    color: "#1A1D16",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  saveBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FF8927",
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#FFFBF0",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});
