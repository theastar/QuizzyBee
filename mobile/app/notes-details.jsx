import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import { useNotesStore } from "../context/NotesContext";
import { useAuthStore } from "../context/AuthStore";

function NoteDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { updateNote, loading } = useNotesStore();
  const { user } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(params.title || "");
  const [subject, setSubject] = useState(params.subject || "");
  const [content, setContent] = useState(params.content || "");

  const handleSave = async () => {
    if (!title || !subject || !content) {
      return;
    }

    if (!user?._id) {
      return;
    }

    try {
      await updateNote(params.id, user._id, title, content, subject);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setTitle(params.title || "");
    setSubject(params.subject || "");
    setContent(params.content || "");
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back button row - fixed at top */}
      <View style={styles.backBtnArea}>
        <BackButton />
      </View>

      {/* Edit button row */}
      <View style={styles.editBtnArea}>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setIsEditing(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="create-outline" size={22} color="#fff" style={{ marginRight: 5 }} />
            <Text style={styles.editBtnText}>Edit Note</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleCancel}
              activeOpacity={0.85}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveBtnText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Content container */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Title</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            placeholder="Enter title..."
            placeholderTextColor="#A25C30"
            value={title}
            onChangeText={setTitle}
          />
        ) : (
          <Text style={styles.field}>{title}</Text>
        )}

        <Text style={styles.label}>Subject</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            placeholder="Enter subject..."
            placeholderTextColor="#A25C30"
            value={subject}
            onChangeText={setSubject}
          />
        ) : (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{subject}</Text>
          </View>
        )}

        <Text style={styles.label}>Content</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Start typing your notes..."
            placeholderTextColor="#A25C30"
            multiline
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />
        ) : (
          <Text style={styles.body}>{content}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default NoteDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  backBtnArea: {
    paddingLeft: 20,
    paddingTop: 1,
    paddingBottom: 10,
    marginTop: -20,
  },
  editBtnArea: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 8,
    marginBottom: 15,
    marginTop: -5,
  },
  editBtn: {
    flexDirection: "row",
    backgroundColor: "#FE9A00",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#FABF41",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  editBtnText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  cancelBtn: {
    backgroundColor: "#FFFBF0",
    borderWidth: 2,
    borderColor: "#FDEBA1",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  cancelBtnText: {
    color: "#E17203",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#E17203",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 20,
    minWidth: 80,
  },
  saveBtnText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },
  label: {
    color: "#1A1D16",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginTop: 14,
    marginBottom: 2,
  },
  field: {
    color: "#A25C30",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    padding: 11,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    backgroundColor: "#FFF",
    marginBottom: 2,
  },
  multiline: {
    minHeight: 200,
    fontFamily: "Poppins_400Regular",
  },
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "#FDEBA1",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginTop: 3,
    marginBottom: 8,
  },
  chipText: {
    color: "#A25C30",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  body: {
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    marginTop: 4,
  },
});
