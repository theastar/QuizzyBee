import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet, ScrollView } from "react-native";
import { useRouter, Link } from "expo-router";
import BackButton from "../components/BackButton";
import { Ionicons } from "@expo/vector-icons";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Bee icon */}
        <Image source={require("../assets/images/bee_icon.png")} style={styles.beeLogo} />

        {/* Title and subtitle */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join QuizzyBee and start studying</Text>

        {/* Name input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#A25C30"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Student ID input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Student ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your student ID"
            placeholderTextColor="#A25C30"
            value={studentId}
            onChangeText={setStudentId}
            keyboardType="numeric"
          />
        </View>

        {/* Email input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#A25C30"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputIconWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              placeholder="Create a password"
              placeholderTextColor="#A25C30"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <Pressable onPress={() => setPasswordVisible((v) => !v)} style={styles.iconBtn}>
              <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="#A25C30" />
            </Pressable>
          </View>
        </View>

        {/* Confirm password input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputIconWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              placeholder="Confirm your password"
              placeholderTextColor="#A25C30"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmVisible}
            />
            <Pressable onPress={() => setConfirmVisible((v) => !v)} style={styles.iconBtn}>
              <Ionicons name={confirmVisible ? "eye" : "eye-off"} size={24} color="#A25C30" />
            </Pressable>
          </View>
        </View>

        {/* Sign Up button */}
        <Pressable
          onPress={() => router.push("/tabs/home")}
          style={({ pressed }) => [styles.actionBtn, { backgroundColor: pressed ? "#E17203" : "#FE9A00" }]}
        >
          <Text style={styles.actionBtnText}>Sign Up</Text>
        </Pressable>

        {/* Link to Login */}
        <Text style={styles.signupContainer}>
          Already have an account?{" "}
          <Link href="/login" asChild>
            <Text style={styles.signupText}>Log In</Text>
          </Link>
        </Text>
      </ScrollView>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 24,
    minHeight: 50,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  beeLogo: {
    width: 380,
    height: 100,
    alignSelf: "center",
    marginTop: 0,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    color: "#1A1D16",
    fontFamily: "Poppins_700Bold",
    marginBottom: -10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
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
  inputIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
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
  iconBtn: {
    position: "absolute",
    right: 10,
    padding: 8,
    height: "100%",
    justifyContent: "center",
  },
  actionBtn: {
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    marginBottom: 18,
    marginTop: 5,
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
  signupContainer: {
    textAlign: "center",
    fontSize: 13,
    color: "#1A1D16",
    fontFamily: "Poppins_400Regular",
  },
  signupText: {
    color: "#1A1D16",
    fontFamily: "Poppins_700Bold",
    textDecorationLine: "underline",
  },
});
