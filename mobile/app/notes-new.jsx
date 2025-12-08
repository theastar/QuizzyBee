import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { NotesContext } from "../context/NotesContext";
import BackButton from "../components/BackButton"; 

function NewNote() {
  const router = useRouter();
  const { addNote } = useContext(NotesContext);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  function handleSave() {
    if (!title || !subject || !content) return;
    addNote({
      id: Math.random().toString(36).slice(2, 10),
      title,
      subject,
      content,
    });
    router.back();
  }

  return (
    <KeyboardAvoidingView 
      style={styles.page} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Back button row */}
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
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default NewNote;

const styles = StyleSheet.create({
  page: { 
    flex: 1, 
    backgroundColor: "#FFFBF0", 
  },
  backBtnArea: {
    position: "absolute",
    top: 29,
    left: 20,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 80,
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
});
