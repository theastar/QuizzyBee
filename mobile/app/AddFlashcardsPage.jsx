import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FlashcardsContext } from "../context/FlashcardsContext";
import BackButton from "../components/BackButton";

function AddFlashcardsPage() {
  const { addCardToDeck } = useContext(FlashcardsContext);
  const router = useRouter();
  const params = useLocalSearchParams();
  const deckId = params.deckId;

  const [inputs, setInputs] = useState([{ q: "", a: "" }]);

  const handleAddCard = () => setInputs(list => [...list, { q: "", a: "" }]);

  const handleChange = (idx, key, val) => {
    setInputs(list =>
      list.map((entry, i) => i === idx ? { ...entry, [key]: val } : entry)
    );
  };

  const handleSave = () => {
    inputs.forEach(entry => {
      if (entry.q && entry.a) {
        addCardToDeck(deckId, { question: entry.q, answer: entry.a });
      }
    });
    setInputs([{ q: "", a: "" }]);
    router.back();
  };

  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.backButtonRow}>
          <BackButton />
        </View>
        <Text style={styles.title}>Add Flashcards</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {inputs.map((card, idx) => (
            <View style={styles.inputCard} key={idx}>
              <Text style={styles.label}>Question</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter question..."
                placeholderTextColor="#B27637"
                value={card.q}
                onChangeText={v => handleChange(idx, "q", v)}
              />
              <Text style={styles.label}>Answer</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter answer..."
                placeholderTextColor="#B27637"
                value={card.a}
                onChangeText={v => handleChange(idx, "a", v)}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.addCardBtn} onPress={handleAddCard}>
            <Text style={styles.plusIcon}>＋</Text>
            <Text style={styles.addCardText}>Add another card</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.saveBar}>
          <TouchableOpacity
            style={[styles.saveBtn, inputs.some(card => card.q && card.a) ? null : { opacity: 0.65 }]}
            onPress={handleSave}
            disabled={!inputs.some(card => card.q && card.a)}
          >
            <Text style={styles.saveBtnText}>Save Flashcards</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default AddFlashcardsPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF9EB",
  },
  backButtonRow: {
    paddingLeft: 20,
    paddingTop: 1,
    paddingBottom: 10,
    marginTop: -9,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#24201A",
    marginLeft: 20,
    marginBottom: 14,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 130,
  },
  inputCard: {
    backgroundColor: "#FEF5E3",
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "#FFE59C",
    padding: 16,
    marginBottom: 18,
    marginHorizontal: 10,
    width: "95%",
    alignSelf: "center",
  },
  label: {
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
    color: "#20190F",
    marginBottom: 9,
    marginTop: 1,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#FFE59C",
    borderRadius: 13,
    color: "#B27637",
    backgroundColor: "#FAFAF5",
    marginBottom: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  addCardBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 24,
    marginLeft: 18,
  },
  plusIcon: {
    fontSize: 22,
    color: "#F19933",
    fontWeight: "bold",
  },
  addCardText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#F19933",
    fontFamily: "Poppins_700Bold",
  },
  saveBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF9EB",
    padding: 16,
    alignItems: "center",
    zIndex: 10,
  },
  saveBtn: {
    width: "100%",
    backgroundColor: "#FDB467",
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 5,
    paddingVertical: 10,
  },
  saveBtnText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 21,
  },
});
