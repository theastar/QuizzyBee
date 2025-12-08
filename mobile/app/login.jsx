import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "../components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../context/AuthStore";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login, isLoading, clearError } = useAuthStore();

  const handleLogin = async () => {
    // Clear previous errors
    clearError();
    setErrorMessage("");

    // Validation
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Call login API
    const result = await login(email, password);

    if (result.success) {
      // Get user from store to check role
      const { user } = useAuthStore.getState();

      // Redirect based on role
      if (user?.role === 'admin') {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/tabs/home");
      }
    } else {
      // Show inline error message
      setErrorMessage(result.error || "Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
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

      {/* Error Message */}
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={20} color="#c2410c" />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errorMessage && styles.inputError]}
          placeholder="Enter your email"
          placeholderTextColor="#A25C30"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputIconWrapper}>
          <TextInput
            style={[styles.input, { paddingRight: 40 }, errorMessage && styles.inputError]}
            placeholder="Enter your password"
            placeholderTextColor="#A25C30"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
            }}
            editable={!isLoading}
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

      <View style={{ alignSelf: 'flex-end' }}>
        <Pressable onPress={() => router.push("/forgotpass")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>
      </View>

      {/* Login Button */}
      <Pressable
        onPress={handleLogin}
        disabled={isLoading}
        style={({ pressed }) => [
          styles.loginBtn,
          { backgroundColor: pressed && !isLoading ? "#E17203" : "#FE9A00" },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFCD0" />
        ) : (
          <Text style={styles.loginBtnText}>Login</Text>
        )}
      </Pressable>

      {/* Sign Up link */}
      <Text style={styles.signupContainer}>
        You don't have an account yet?{" "}
        <Text style={styles.signupText} onPress={() => router.replace('/signup')}>Sign Up</Text>
      </Text>
    </View>
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
    marginBottom: 20,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffedd5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#c2410c",
  },
  errorText: {
    color: "#c2410c",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginLeft: 8,
    flex: 1,
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
  inputError: {
    borderColor: "#c2410c",
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
