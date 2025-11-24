import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlashcardsContext } from "../../context/FlashcardsContext";
import BackButton from "../../components/BackButton";
import CreateDeckModal from "../../components/CreateDeckModal";
import AddFlashcardsModal from "../../components/AddFlashcardsModal";
import DeleteModal from "../../components/DeleteModal";

function Flashcards() {
  const router = useRouter();
  // Use flashcards data and actions from context
  const { decks, addDeck, deleteDeck } = useContext(FlashcardsContext);
  // Modal state
  const [deckModalVisible, setDeckModalVisible] = useState(false);
  const [activeDeckId, setActiveDeckId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <View style={styles.page}>
      {/* Back button container */}
      <View style={styles.backButtonRow}>
        <BackButton />
      </View>
      {/* Header with create deck button */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.createDeckBtn}
          onPress={() => setDeckModalVisible(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle-outline" size={21} color="#fff" />
          <Text style={styles.createDeckText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
      {/* Decks list */}
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        {decks.length === 0 ? (
          <Text
            style={{
              color: "#99742c",
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              textAlign: "center",
              marginTop: 200,}}>
            No flashcards yet.
          </Text>
        ) : (
          decks.map((deck) => (
            <View key={deck.id} style={styles.deckCard}>
              {/* Delete deck button */}
              <TouchableOpacity onPress={() => setDeleteId(deck.id)} style={styles.trashIcon} hitSlop={8}>
                <Ionicons name="trash" size={20} color="#E53935" />
              </TouchableOpacity>

              {/* Deck info */}
              <View style={styles.deckTopContent}>
                <View style={styles.deckIconWrap}>
                  <MaterialCommunityIcons name="cards" size={27} color="#fff" />
                </View>
                <View style={styles.deckTextCol}>
                  <Text style={styles.deckTitle}>{deck.title}</Text>
                  <Text style={styles.cardsCount}>{deck.cards.length} cards</Text>
                </View>
              </View>

              {/* Deck actions */}
              <View style={styles.deckCardActions}>
                <TouchableOpacity
                  style={styles.studyBtn}
                  activeOpacity={0.92}
                  onPress={() =>
                    deck.cards.length === 0
                      ? setActiveDeckId(deck.id)
                      : router.push({ pathname: "/flashcard-study", params: { id: deck.id } })
                  }
                >
                  <Text style={styles.studyBtnText}>Study</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addCardBtn} onPress={() => setActiveDeckId(deck.id)}>
                  <Ionicons name="add" size={25} color="#111" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modals for deck creation, card addition, and deletion */}
      <CreateDeckModal
        visible={deckModalVisible}
        onClose={() => setDeckModalVisible(false)}
        onCreate={(title) => {
          addDeck(title);
          setDeckModalVisible(false);
        }}
      />
      <AddFlashcardsModal
        visible={!!activeDeckId}
        onClose={() => setActiveDeckId(null)}
        deckId={activeDeckId}
      />
      <DeleteModal
        visible={!!deleteId}
        onConfirm={() => {
          deleteDeck(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </View>
  );
}

export default Flashcards;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#FFFBEF", paddingTop: 60 },
  backButtonRow: {
    paddingLeft: 20,
    paddingTop: 1,
    paddingBottom: 10,
    marginTop: -20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 8,
    marginBottom: 25,
  },
  createDeckBtn: {
    flexDirection: "row",
    backgroundColor: "#FE9A00",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 13,
    elevation: 2,
    shadowColor: "#FABF41",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  createDeckText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginLeft: 6,
  },
  deckCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "#FFF1CD",
    marginHorizontal: 11,
    marginBottom: 18,
    padding: 17,
    paddingTop: 18,
    shadowColor: "#F2B656",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 17,
    elevation: 8,
    position: "relative",
    overflow: "visible",
  },
  deckTopContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 0,
  },
  deckIconWrap: {
    backgroundColor: "#FF7300",
    borderRadius: 8,
    padding: 8,
    alignSelf: "flex-start",
  },
  deckTextCol: {
    marginLeft: 13,
    flexShrink: 1,
    minWidth: 0,
  },
  deckTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 19,
    color: "#23201e",
    marginBottom: -5,
    flexShrink: 1,
  },
  cardsCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#A25C30",
    marginBottom: 2,
  },
  deckCardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trashIcon: {
  position: "absolute",
  top: 10,
  right: 10,
},
  studyBtn: {
    backgroundColor: "#FF8927",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  studyBtnText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  addCardBtn: {
    marginLeft: 7,
    backgroundColor: "#FFFBEF",
    borderColor: "#FFCF6A",
    borderRadius: 9,
    borderWidth: 2,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
