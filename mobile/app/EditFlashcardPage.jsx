import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackButton from "../components/BackButton"; // adjust path as necessary

function EditFlashcardPage() {
  const router = useRouter();
  // Assuming route params: q (question), a (answer)
  const params = useLocalSearchParams();
  // Or get card from context/global state
  const [q, setQ] = useState(params.q ?? "");
  const [a, setA] = useState(params.a ?? "");

  // Optionally: If editing existing card, fetch via context/store instead of params

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <BackButton onPress={() => router.back()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Flashcard</Text>
        <Text style={styles.label}>Question</Text>
        <TextInput style={styles.input} value={q} onChangeText={setQ} />
        <Text style={styles.label}>Answer</Text>
        <TextInput style={styles.input} value={a} onChangeText={setA} />
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => {
            // Implement updating card logic here!
            // For example, call a context action
            // cardContext.editCardInDeck(deckId, cardIndex, { question: q, answer: a });
            router.back();
          }}
        >
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default EditFlashcardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  headerRow: {
    marginTop: -19,
    marginLeft: 4,
    marginBottom: 0,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1A1D16",
    marginBottom: 16,
    marginTop: 16,
    textAlign: "left",
    width: "100%",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1A1D16",
    marginTop: 14,
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
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  doneBtn: {
    backgroundColor: "#FF8927",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 420,
    marginBottom: 0,
  },
  doneBtnText: {
    color: "#FFFBF0",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
});
