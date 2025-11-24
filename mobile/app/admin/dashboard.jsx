import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const statsData = [
  { label: "Total Users", value: "120", emoji: "📊" },
  { label: "Total Quizzes", value: "45", emoji: "📦" },
  { label: "Pending Approvals", value: "7", emoji: "📝" },
];

export default function Dashboard() {
  return (
    <ScrollView
      style={{ backgroundColor: "#FFFBF0" }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Welcome, Admin!</Text>
      <Text style={styles.subheader}>
        Here's an overview of your dashboard.
      </Text>

      <View style={styles.statsContainer}>
        {statsData.map((item) => (
          <View style={styles.statBox} key={item.label}>
            <Text style={styles.statEmoji}>{item.emoji}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    color: "#1A1D16",
    fontFamily: "Poppins_600SemiBold",
    alignSelf: "flex-start",
    marginTop: 40,
  },
  subheader: {
    fontSize: 15,
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    marginBottom: 22,
    alignSelf: "flex-start",
    marginTop: -5,
  },
  statsContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 14,
  },
  statBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    padding: 18,
    alignItems: "flex-start",
    marginBottom: 14,
    elevation: 2,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
    color: "#1A1D16",
  },
  statLabel: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#A25C30",
    marginTop: -2,
  },
});
