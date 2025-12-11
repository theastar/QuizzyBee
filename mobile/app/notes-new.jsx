import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useNotesStore } from "../context/NotesContext";
import { useAuthStore } from "../context/AuthStore";
import BackButton from "../components/BackButton";

function NewNote() {
  const router = useRouter();
  const { createNote, loading } = useNotesStore();
  const { user } = useAuthStore();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  async function handleSave() {
    if (!title || !subject || !content) {
      Alert.alert("Missing Fields", "Please fill in all fields");
      return;
    }

    if (!user?._id) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    try {
      await createNote(user._id, title, content, subject);
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create note. Please try again.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back button row - fixed at top */}
      <View style={styles.backBtnArea}>
        <BackButton />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title..."
          placeholderTextColor="#A25C30"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Subject..."
          placeholderTextColor="#A25C30"
          value={subject}
          onChangeText={setSubject}
        />
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Start typing your notes..."
          placeholderTextColor="#A25C30"
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />
        <TouchableOpacity
          style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default NewNote;

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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 5,
    paddingHorizontal: 18,
    paddingBottom: 40,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1A1D16",
    marginTop: 14,
    marginBottom: 2,
  },
  input: {
    fontSize: 16,
    padding: 11,
    borderRadius: 7,
    borderWidth: 0,
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    backgroundColor: "#FFFBF0",
    marginBottom: 2,
  },
  multiline: {
    minHeight: 200,
    fontFamily: "Poppins_400Regular",
  },
  saveBtn: {
    backgroundColor: "#E17203",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 24,
  },
  saveBtnText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    fontSize: 17,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
});
