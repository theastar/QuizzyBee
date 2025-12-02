import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useRouter, Link } from "expo-router";
import BackButton from "../components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../context/AuthStore";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { register, isLoading, clearError, logout } = useAuthStore();

  const handleSignUp = async () => {
    // Clear previous errors
    clearError();

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (username.length < 6) {
      Alert.alert("Error", "Username should be at least 6 characters long");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Call register API
    const result = await register(username, email, password);

    if (result.success) {
      // Show success message
      Alert.alert(
        "Success!",
        "Account created successfully! Please log in.",
        [
          {
            text: "OK",
            onPress: () => {
              // Logout to clear the auth state so user has to login
              logout();
              // Navigate to login page
              router.replace("/login");
            }
          }
        ]
      );
    } else {
      // Show error alert
      Alert.alert("Registration Failed", result.error);
    }
  };

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

        {/* Username input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username (min 6 characters)"
            placeholderTextColor="#A25C30"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!isLoading}
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
            editable={!isLoading}
          />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputIconWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              placeholder="Create a password (min 6 characters)"
              placeholderTextColor="#A25C30"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              editable={!isLoading}
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
              editable={!isLoading}
            />
            <Pressable onPress={() => setConfirmVisible((v) => !v)} style={styles.iconBtn}>
              <Ionicons name={confirmVisible ? "eye" : "eye-off"} size={24} color="#A25C30" />
            </Pressable>
          </View>
        </View>

        {/* Sign Up button */}
        <Pressable
          onPress={handleSignUp}
          disabled={isLoading}
          style={({ pressed }) => [styles.actionBtn, { backgroundColor: isLoading ? "#CCC" : (pressed ? "#E17203" : "#FE9A00") }]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFCD0" />
          ) : (
            <Text style={styles.actionBtnText}>Sign Up</Text>
          )}
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
