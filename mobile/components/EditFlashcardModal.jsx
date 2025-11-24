import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

// Modal for editing a flashcard question/answer
function EditFlashcardModal({ visible, onClose, card, onSave }) {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  useEffect(() => {
    if (card) {
      setQ(card.question);
      setA(card.answer);
    }
  }, [card, visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Close Button */}
          <TouchableOpacity style={styles.xBtn} onPress={onClose}>
            <Text style={styles.xText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Flashcard</Text>
          <Text style={styles.label}>Question</Text>
          <TextInput style={styles.input} value={q} onChangeText={setQ} />
          <Text style={styles.label}>Answer</Text>
          <TextInput style={styles.input} value={a} onChangeText={setA} />
          {/* Save Button */}
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => onSave({ question: q, answer: a })}
          >
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default EditFlashcardModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.17)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#FFFBF0",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    padding: 22,
    minWidth: 320,
    alignItems: "stretch",
    position: "relative",
  },
  xBtn: {
    position: "absolute",
    right: 14,
    top: 12,
    zIndex: 10,
    padding: 6,
  },
  xText: {
    fontSize: 22,
    color: "#A25C30",
    fontWeight: "600",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#1A1D16",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#1A1D16",
    marginBottom: 5,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#FDEBA1",
    borderRadius: 6,
    color: "#E17203",
    backgroundColor: "#fff",
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  doneBtn: {
    backgroundColor: "#FE9A00",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 6,
    marginTop: 15,
  },
  doneBtnText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  }
});
