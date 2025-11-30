import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BackButton from "../../components/BackButton";

function Pomodoro() {
  const router = useRouter();
  const [mode, setMode] = useState("study");
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const studyMinutes = 25;
  const breakMinutes = 5;

  React.useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) return prev - 1;
          else {
            let newMode = mode === "study" ? "break" : "study";
            setMode(newMode);
            return newMode === "study" ? studyMinutes * 60 : breakMinutes * 60;
          }
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  const formatTime = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  const selectMode = (target) => {
    setMode(target);
    setTimer(target === "study" ? studyMinutes * 60 : breakMinutes * 60);
    setIsRunning(false);
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setTimer(mode === "study" ? studyMinutes * 60 : breakMinutes * 60);
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backBtnArea}>
        <BackButton />
      </View>
      <View style={styles.page}>
        <View style={styles.timerCard}>
          <Text style={styles.sessionTitle}>Focus Session</Text>
          <View style={styles.modeRow}>
            <TouchableOpacity
              onPress={() => selectMode("study")}
              style={[
                styles.modeBtn,
                mode === "study" && { backgroundColor: "#E17203", borderWidth: 0 },
              ]}
            >
              <Text
                style={[
                  styles.modeText,
                  mode === "study" ? { color: "#FFFBF0" } : { color: "#E17203" },
                ]}
              >
                Study (25 min)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectMode("break")}
              style={[
                styles.modeBtn,
                mode === "break" && { backgroundColor: "#FE9A00", borderWidth: 0 },
              ]}
            >
              <Text
                style={[
                  styles.modeText,
                  mode === "break" ? { color: "#FFFBF0" } : { color: "#FE9A00" },
                ]}
              >
                Break (5 min)
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.time}>{formatTime(timer)}</Text>
          <Text style={styles.subtitle}>Bee-lieve in yourself!</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.startBtn} onPress={handleStartPause}>
              <Ionicons
                name={isRunning ? "pause" : "play"}
                color="#fff"
                size={23}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.startBtnText}>{isRunning ? "Pause" : "Start"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Ionicons name="refresh" color="#E17203" size={23} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Pomodoro;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  backBtnArea: {
    paddingLeft: 20,
    paddingTop: 1,
    paddingBottom: 10,
    marginTop: -20,
  },
  page: {
    flex: 1,
    backgroundColor: "#FFFBF0",
    padding: 18,
    justifyContent: "flex-start",
  },
  timerCard: {
    backgroundColor: "#FFF",
    borderColor: "#FDEBA1",
    borderWidth: 2,
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    minHeight: 360,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
    marginTop: 80,
  },
  sessionTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#1A1D16",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  modeRow: { flexDirection: "row", gap: 12, marginBottom: 25, width: "100%" },
  modeBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    backgroundColor: "#FFFBF0",
  },
  modeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#A25C30",
    alignContent: 'center',
  },
  time: {
    fontSize: 80,
    fontFamily: "Poppins_600SemiBold",
    color: "#E17203",
    marginBottom: -10,
    marginTop: -2,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    color: "#A25C30",
    fontSize: 15,
    marginBottom: 30,
  },
  btnRow: {
    flexDirection: "row",
    gap: 18,
  },
  startBtn: {
    backgroundColor: "#FE9A00",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 26,
    marginRight: 6,
  },
  startBtnText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  resetBtn: {
    backgroundColor: "#FFFBF0",
    borderWidth: 2,
    borderColor: "#FDEBA1",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: 44,
    height: 44,
    marginLeft: 6,
  },
});
