import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";

function ForgotPass() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  // Confirmation screen
  if (sent) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
        </View>

        <Image source={require("../assets/images/bee_icon.png")} style={styles.beeLogo} />

        <Text style={styles.title}>Reset Password</Text>

        <Text style={styles.subtitleCenter}>
          We’ve sent password reset{"\n"}instructions to your email.
        </Text>

        <View style={styles.successIconWrap}>
          <Ionicons name="checkmark-circle" size={60} color="#50C878" />
        </View>

        <Pressable
          onPress={() => router.push("/login")}
          style={({ pressed }) => [styles.actionBtn, { backgroundColor: pressed ? "#E17203" : "#FE9A00" }]}
        >
          <Text style={styles.actionBtnText}>Back To Login</Text>
        </Pressable>
      </View>
    );
  }

  // Initial forgot password screen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <Image source={require("../assets/images/bee_icon.png")} style={styles.beeLogo} />

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitleCenter}>Enter your email to reset your password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#A25C30"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Pressable
        onPress={() => setSent(true)}
        style={({ pressed }) => [styles.actionBtn, { backgroundColor: pressed ? "#E17203" : "#FE9A00" }]}
      >
        <Text style={styles.actionBtnText}>Send Reset Link</Text>
      </Pressable>
    </View>
  );
}

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0",
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 0,
    minHeight: 50,
  },
  beeLogo: {
    width: 380,
    height: 100,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    color: "#1A1D16",
    fontFamily: "Poppins_700Bold",
    marginBottom: 10,
  },
  subtitleCenter: {
    textAlign: "center",
    fontSize: 16,
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#1A1D16",
    marginBottom: 4,
    fontFamily: "Poppins_400Regular",
  },
  input: {
    width: "100%",
    minHeight: 45,
    borderWidth: 2,
    borderColor: "#A25C30",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    fontSize: 14,
    color: "#1A1D16",
    fontFamily: "Poppins_300Light",
  },
  actionBtn: {
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#E17203",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
    width: "100%",
  },
  actionBtnText: {
    color: "#FFFCD0",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  successIconWrap: {
    alignItems: "center",
    marginVertical: 40,
  },
});
