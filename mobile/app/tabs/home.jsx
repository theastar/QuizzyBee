import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useAuthStore } from "../../context/AuthStore";
import { useQuizStore } from "../../context/QuizStore";

const menuData = [
  {
    label: "Calendar",
    icon: <MaterialIcons name="calendar-today" size={30} color="#FFFBF0" />,
    colors: ["#FFB73C", "#FE9E00"],
  },
  {
    label: "Pomodoro",
    icon: <Ionicons name="timer-outline" size={30} color="#FFFBF0" />,
    colors: ["#FFCD28", "#F7BD00"],
  },
  {
    label: "Flashcards",
    icon: <FontAwesome5 name="clone" size={28} color="#FFFBF0" />,
    colors: ["#FF8927", "#FF7300"],
  },
  {
    label: "Notes",
    icon: <MaterialIcons name="edit" size={30} color="#FFFBF0" />,
    colors: ["#FFB027", "#FA9F00"],
  },
];

// Main Home screen component
function Home() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { fetchRecentQuizzes, getRecentQuizzes } = useQuizStore();

  // Extract first name from full name
  const getFirstName = () => {
    if (!user?.name) return "Student";
    return user.name.split(" ")[0];
  };

  // Fetch recent quiz activities whenever the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (user?._id) {
        fetchRecentQuizzes(user._id, 4).catch(err => {
          console.error("Failed to fetch recent quizzes:", err);
        });
      }
    }, [user])
  );

  // Get recent quiz activities
  const recentQuizzes = getRecentQuizzes(4);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Text style={styles.header}>Welcome back, {getFirstName()}!</Text>
        <Text style={styles.subheader}>
          Ready to continue your learning journey?
        </Text>

        {/* First row of menu buttons */}
        <View style={styles.menuRow}>
          {menuData.slice(0, 2).map((item) => (
            <TouchableOpacity
              key={item.label}
              style={{ flex: 1 }}
              activeOpacity={0.9}
              onPress={() => {
                if (item.label === "Calendar") router.push("/dashboard/calendar");
                else if (item.label === "Pomodoro") router.push("/dashboard/pomodoro");
              }}
            >
              <LinearGradient
                colors={item.colors}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuButton}
              >
                {item.icon}
                <Text style={styles.menuLabel}>{item.label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Second row of menu buttons */}
        <View style={styles.menuRow}>
          {menuData.slice(2).map((item) => (
            <TouchableOpacity
              key={item.label}
              style={{ flex: 1 }}
              activeOpacity={0.9}
              onPress={() => {
                if (item.label === "Flashcards") router.push("/dashboard/flashcards");
                else if (item.label === "Notes") router.push("/dashboard/notes");
              }}
            >
              <LinearGradient
                colors={item.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuButton}
              >
                {item.icon}
                <Text style={styles.menuLabel}>{item.label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent quiz activity section */}
        <View style={styles.quizBox}>
          <Text style={styles.quizTitle}>Recent Quiz Activity</Text>
          {recentQuizzes.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No quizzes completed yet.</Text>
            </View>
          ) : (
            recentQuizzes.map((activity) => (
              <View style={styles.quizItem} key={activity.id}>
                <Text style={styles.quizItemTitle}>{activity.title}</Text>
                <Text style={styles.quizItemDate}>{activity.date}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  scrollView: {
    backgroundColor: "#FFFBF0",
  },
  container: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    color: "#1A1D16",
    textAlign: "left",
    fontFamily: "Poppins_600SemiBold",
    alignSelf: "flex-start",
    marginTop: -10,
  },
  subheader: {
    fontSize: 15,
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    marginBottom: 22,
    alignSelf: "flex-start",
    marginTop: -5,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 14,
    gap: 14,
  },
  menuButton: {
    flex: 1,
    aspectRatio: 1.55,
    borderRadius: 12,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 18,
    marginHorizontal: 4,
    minWidth: 135,
    maxWidth: 180,
    elevation: 2,
  },
  menuLabel: {
    color: "#FFFBF0",
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    marginTop: 10,
  },
  quizBox: {
    marginTop: 18,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    padding: 18,
  },
  quizTitle: {
    marginTop: 12,
    fontSize: 20,
    color: "#1A1D16",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 18,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 30,
  },
  emptyStateText: {
    color: "#99742c",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  quizItem: {
    borderWidth: 2,
    borderColor: "#FDEBA1",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#FFFBF0",
  },
  quizItemTitle: {
    color: "#1A1D16",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  quizItemDate: {
    color: "#A25C30",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginTop: -5,
  },
});
