import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "../components/BackButton"; // Adjust path as needed
import { FlashcardsContext } from "../context/FlashcardsContext"; // Adjust path as needed

function CreateDeckPage() {
  const [title, setTitle] = useState("");
  const { addDeck } = useContext(FlashcardsContext);
  const router = useRouter();

  useEffect(() => {
    setTitle("");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <BackButton fallbackRoute="/dashboard/flashcards" />
      </View>
      <View style={styles.innerContent}>
        <Text style={styles.title}>Create New Deck</Text>
        <Text style={styles.label}>Deck Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Deck Title..."
          placeholderTextColor="#A25C30"
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.createBtn, !title.trim() && { opacity: 0.65 }]}
          onPress={() => {
            if (title.trim()) {
              addDeck(title);
              setTitle("");
              router.push("/dashboard/flashcards");
            }
          }}
          disabled={!title.trim()}
        >
          <Text style={styles.createBtnText}>Create & Add cards</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default CreateDeckPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0",
    justifyContent: "flex-start",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  headerRow: {
    marginTop: -37,
    marginLeft: 4,
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingTop: 18,
    marginBottom: 10,
  },
  innerContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingHorizontal: 20,
    paddingTop: 0,
    width: "100%",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#1A1D16",
    marginBottom: 16,
    marginTop: 8,
    textAlign: "left",
    width: "100%",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1A1D16",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    borderRadius: 7,
    color: "#A25C30",
    backgroundColor: "#F8F8F8",
    marginBottom: 10,
    marginTop: 15,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  createBtn: {
    backgroundColor: "#FF8927",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 510,
    marginBottom: 0,
  },
  createBtnText: {
    color: "#FFFBF0",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
});
