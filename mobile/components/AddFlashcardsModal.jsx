import React, { useState, useContext } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { FlashcardsContext } from "../context/FlashcardsContext";
import { Ionicons } from "@expo/vector-icons";

// Modal component for adding flashcards to a deck
function AddFlashcardsModal({ visible, onClose, deckId }) {
  const { addCardToDeck } = useContext(FlashcardsContext);
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
    onClose();
  };

  if (!visible) return null;
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modal}
        >
          <TouchableOpacity style={styles.xBtn} onPress={onClose}>
            <Ionicons name="close" size={22} color="#A25C30" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Flashcards</Text>
          <View style={{ flex: 1, minHeight: 140 }}>
            <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
              {inputs.map((input, idx) => (
                <View key={idx} style={styles.inputGroup}>
                  <Text style={styles.label}>Question</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter question..."
                    placeholderTextColor="#A25C30"
                    value={input.q}
                    onChangeText={v => handleChange(idx, "q", v)}
                  />
                  <Text style={styles.label}>Answer</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter answer..."
                    placeholderTextColor="#A25C30"
                    value={input.a}
                    onChangeText={v => handleChange(idx, "a", v)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity onPress={handleAddCard} style={styles.addAnotherBtn} activeOpacity={0.9}>
              <Ionicons name="add" size={17} color="#A25C30" style={{ marginRight: 7 }} />
              <Text style={styles.addAnotherText}>Add Another Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.93}>
              <Text style={styles.saveBtnText}>Save Flashcards</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

export default AddFlashcardsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.13)",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#FFFBF0",
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: "#FFF1CD",
    padding: 14,
    minWidth: 305,
    width: 340,
    maxWidth: "98%",
    maxHeight: 560,
    height: 560,
    elevation: 6,
    flexDirection: "column",
    alignItems: "stretch",
    position: "relative"
  },
  xBtn: {
    position: "absolute",
    top: 13,
    right: 10,
    zIndex: 10
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#191919",
    marginBottom: 13,
    marginTop: 2,
    textAlign: "center"
  },
  scrollArea: { paddingBottom: 7 },
  inputGroup: {
    borderColor: "#FFEEB8",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 11,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: "#fff"
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#23201e",
    marginBottom: 1
  },
  input: {
    padding: 7,
    borderWidth: 2,
    borderColor: "#FFEEB8",
    borderRadius: 7,
    color: "#A25C30",
    backgroundColor: "#FFF7EB",
    marginBottom: 9,
    fontFamily: "Poppins_500Medium",
    fontSize: 13
  },
  btnRow: {
    marginTop: 7
  },
  addAnotherBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addAnotherText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#A25C30',
  },
  saveBtn: {
    backgroundColor: '#FE9A00',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveBtnText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  }
});
