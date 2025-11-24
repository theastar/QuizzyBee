import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter, Link } from "expo-router";
import BackButton from "../components/BackButton";
import { Ionicons } from "@expo/vector-icons";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
      </View>

      {/* Bee Icon */}
      <Image
        source={require("../assets/images/bee_icon.png")}
        style={styles.beeLogo}
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to continue studying</Text>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email or Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email or username"
          placeholderTextColor="#A25C30"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputIconWrapper}>
          <TextInput
            style={[styles.input, { paddingRight: 40 }]}
            placeholder="Enter your password"
            placeholderTextColor="#A25C30"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible((prev) => !prev)}
            style={styles.iconBtn}
          >
            <Ionicons
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="#A25C30"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push("/forgotpass")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Pressable
        onPress={() => router.push("/tabs/home")}
        style={({ pressed }) => [
          styles.loginBtn,
          { backgroundColor: pressed ? "#E17203" : "#FE9A00" },
        ]}
      >
        <Text style={styles.loginBtnText}>Login</Text>
      </Pressable>

      {/* Sign Up link */}
      <Text style={styles.signupContainer}>
        You don’t have an account yet?{" "}
        <Link href="/signup" asChild>
          <Text style={styles.signupText}>Sign Up</Text>
        </Link>
      </Text>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBF0",
    flex: 1,
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
    marginBottom: -10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    marginBottom: 50,
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
  forgotText: {
    color: "#E17203",
    textAlign: "right",
    marginBottom: 50,
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  loginBtn: {
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#E17203",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
    width: "100%",
  },
  loginBtnText: {
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
