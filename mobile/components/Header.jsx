import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import BackButton from "./BackButton";

function Header() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <BackButton />
      </View>
    </SafeAreaView>
  );
}
export default Header;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFBF0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
});
