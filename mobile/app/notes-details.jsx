import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackButton from "../components/BackButton"; 

function NoteDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.page}>
      {/* BackButton area */}
      <View style={styles.backBtnArea}>
        <BackButton />
      </View>

      {/* Content container */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.field}>{params.title}</Text>

        <Text style={styles.label}>Subject</Text>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{params.subject}</Text>
        </View>

        <Text style={styles.label}>Content</Text>
        <Text style={styles.body}>{params.content}</Text>
      </ScrollView>
    </View>
  );
}

export default NoteDetail;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#FFFBF0", padding: 18 },
  backBtnArea: {
    position: "absolute",
    top: 29,
    left: 20,
    zIndex: 10,
  },
  contentContainer: {
    paddingTop: 90, 
    paddingBottom: 20,
  },
  label: {
    color: "#1A1D16",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginTop: 12,
  },
  field: {
    color: "#A25C30",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    marginBottom: 4,
  },
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "#FDEBA1",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginTop: 3,
    marginBottom: 8,
  },
  chipText: {
    color: "#A25C30",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  body: {
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    marginTop: 4,
  },
});
