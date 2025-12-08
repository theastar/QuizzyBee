import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FlashcardsContext } from "../context/FlashcardsContext";
import DeleteModal from "../components/DeleteModal";
import BackButton from "../components/BackButton";

function FlashcardStudy() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { decks, deleteCardFromDeck } = useContext(FlashcardsContext);

  const deck = decks.find((d) => d.id === id);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  if (!deck) return null;
  const card = deck.cards[index];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.backBtnArea}>
          <BackButton fallbackRoute="/dashboard/flashcards" />
        </View>

        <View style={{ flex: 1, paddingTop: 80 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.box}>
              <Text style={styles.header}>{deck.title}</Text>
              <Text style={styles.cardCount}>
                Card {index + 1} of {deck.cards.length}
              </Text>

              {deck.cards.length === 0 ? (
                <Text style={styles.noCards}>No flashcards created.</Text>
              ) : (
                <TouchableOpacity
                  style={[styles.card, flipped && { backgroundColor: "#4CAF50" }]}
                  onPress={() => setFlipped((f) => !f)}
                  activeOpacity={0.93}
                >
                  <View style={styles.cardInner}>
                    <Text style={styles.cardTopText}>{flipped ? "Answer" : "Question"}</Text>
                    <View style={styles.cardTextContainer}>
                      <Text style={styles.cardText}>{flipped ? card.answer : card.question}</Text>
                    </View>
                    <Text style={styles.cardBottomText}>
                      Click to reveal {flipped ? "question" : "answer"}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              <View style={styles.navRow}>
                <TouchableOpacity
                  disabled={index === 0}
                  onPress={() => {
                    setIndex((i) => i - 1);
                    setFlipped(false);
                  }}
                >
                  <View style={[styles.navButton, index === 0 && styles.disabledNavButton]}>
                    <Ionicons
                      name="arrow-back"
                      size={28}
                      color={index === 0 ? "#FDEBA1" : "#FA9F00"}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={index === deck.cards.length - 1}
                  onPress={() => {
                    setIndex((i) => i + 1);
                    setFlipped(false);
                  }}
                >
                  <View
                    style={[
                      styles.navButton,
                      index === deck.cards.length - 1 && styles.disabledNavButton,
                    ]}
                  >
                    <Ionicons
                      name="arrow-forward"
                      size={28}
                      color={index === deck.cards.length - 1 ? "#FDEBA1" : "#FA9F00"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() =>
                  router.push({
                    pathname: "/EditFlashcardPage",
                    params: {
                      deckId: deck.id,
                      cardIndex: index,
                      q: card.question,
                      a: card.answer,
                    },
                  })
                }
                disabled={!card}
              >
                <Text style={styles.editBtnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => setShowDelete(true)}
                disabled={!card}
              >
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <DeleteModal
          visible={showDelete}
          onConfirm={() => {
            deleteCardFromDeck(deck.id, index);
            setShowDelete(false);
            setIndex((i) => Math.max(0, i - 1));
            setFlipped(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      </View>
    </SafeAreaView>
  );
}

export default FlashcardStudy;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFBF0" },
  page: { flex: 1, backgroundColor: "#FFFBF0", padding: 18, justifyContent: "center" },
  backBtnArea: {
    backgroundColor: "#FFFBF0",
    position: "absolute",
    left: 20,
    top: -21,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  box: {
    borderWidth: 2,
    borderColor: "#FDEBA1",
    borderRadius: 20,
    padding: 18,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  header: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    color: "#1A1D16",
    alignSelf: "flex-start",
    marginLeft: 4,
    marginBottom: 5,
    marginTop: -5,
  },
  cardCount: {
    fontFamily: "Poppins_500Medium",
    color: "#A25C30",
    fontSize: 16,
    marginTop: -10,
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 4,
  },
  noCards: {
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    textAlign: "center",
    marginTop: 68,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FE9A00",
    borderRadius: 18,
    minWidth: 250,
    minHeight: 476,
    marginBottom: 19,
    width: "100%",
    padding: 0,
    alignItems: "stretch",
  },
  cardInner: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 18,
  },
  cardTopText: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  cardText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 28,
  },
  cardBottomText: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
    gap: 32,
  },
  navButton: {
    backgroundColor: "#FFF3D3",
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  disabledNavButton: {
    backgroundColor: "#FFF6DC",
  },
  actionRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 10,
    gap: 12,
    marginTop: 10,
  },
  editBtn: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    marginRight: 9,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#E53935",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    marginLeft: 9,
  },
  editBtnText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  deleteBtnText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});

