import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DeleteModal from "../../components/DeleteModal";
import { useNotesStore } from "../../context/NotesContext";
import { useAuthStore } from "../../context/AuthStore";
import BackButton from "../../components/BackButton";

function Notes() {
  const router = useRouter();
  const { notes, loading, fetchNotes, deleteNote } = useNotesStore();
  const { user } = useAuthStore();
  const [query, setQuery] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  // Fetch notes when component mounts
  useEffect(() => {
    if (user?._id) {
      fetchNotes(user._id).catch(err => {
        console.error("Failed to fetch notes:", err);
      });
    }
  }, [user]);

  const handleDelete = async () => {
    if (!deleteId || !user?._id) return;

    try {
      await deleteNote(deleteId, user._id);
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete note:", error);
      // You might want to show an error alert here
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.subject.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backBtnArea}>
        <BackButton />
      </View>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => router.push("/notes-new")}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle-outline" size={22} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.newBtnText}>New Note</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={19} color="#A25C30" style={{ marginRight: 7, marginTop: 1 }} />
        <TextInput
          placeholder="Search notes"
          placeholderTextColor="#A25C30"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>
        {loading ? (
          <View style={{ marginTop: 200, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#FE9A00" />
          </View>
        ) : filteredNotes.length === 0 ? (
          <Text
            style={{
              color: "#99742c",
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              textAlign: "center",
              marginTop: 200,
            }}
          >
            No notes yet.
          </Text>
        ) : (
          filteredNotes.map((note) => (
            <TouchableOpacity
              key={note.id}
              style={styles.card}
              activeOpacity={0.92}
              onPress={() =>
                router.push({
                  pathname: "/notes-details",
                  params: note,
                })
              }
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{note.title}</Text>
                  <Text style={styles.cardContent} numberOfLines={1}>
                    {note.content}
                  </Text>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{note.subject}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    setDeleteId(note.id);
                  }}
                >
                  <Ionicons name="trash" size={18} color="#E53935" style={{ marginLeft: 6, marginTop: 2 }} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <DeleteModal
        visible={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </SafeAreaView>
  );
}

export default Notes;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFBF0" },
  backBtnArea: {
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
  newBtn: {
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
  newBtnText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginLeft: 6,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBF0",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "#FDEBA1",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  searchInput: { fontFamily: "Poppins_400Regular", fontSize: 16, color: "#A25C30", flex: 1, padding: 0 },
  card: { backgroundColor: "#FFF", borderRadius: 13, borderWidth: 2, borderColor: "#FDEBA1", padding: 18, marginBottom: 13, marginHorizontal: 16 },
  cardTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#1A1D16", marginBottom: -2 },
  cardContent: { fontFamily: "Poppins_400Regular", color: "#A25C30", fontSize: 14, marginBottom: 10 },
  chip: { alignSelf: "flex-start", backgroundColor: "#FDEBA1", borderRadius: 4, paddingVertical: 2, paddingHorizontal: 7, marginTop: 3 },
  chipText: { color: "#A25C30", fontFamily: "Poppins_500Medium", fontSize: 12 },
});
