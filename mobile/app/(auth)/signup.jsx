import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "../../components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../context/AuthStore";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { register, isLoading, clearError, logout } = useAuthStore();

  const handleSignUp = async () => {
    clearError();
    setErrorMessage("");

    // Validation
    if (!name || !studentId || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (name.length < 3) {
      setErrorMessage("Name should be at least 3 characters long");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Call register API
    const result = await register(name, studentId, email, password);

    if (result.success) {
      logout();
      router.replace("/login");
    } else {
      setErrorMessage(result.error || "Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require("../../assets/images/bee_icon.png")} style={styles.beeLogo} />

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to start studying</Text>

        {/* Error Message */}
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#c2410c" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, errorMessage && styles.inputError]}
            placeholder="Enter your full name"
            placeholderTextColor="#A25C30"
            value={name}
            onChangeText={(text) => { setName(text); setErrorMessage(""); }}
            editable={!isLoading}
          />
        </View>

        {/* Student ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Student ID</Text>
          <TextInput
            style={[styles.input, errorMessage && styles.inputError]}
            placeholder="Enter your student ID"
            placeholderTextColor="#A25C30"
            value={studentId}
            onChangeText={(text) => { setStudentId(text); setErrorMessage(""); }}
            editable={!isLoading}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errorMessage && styles.inputError]}
            placeholder="Enter your email"
            placeholderTextColor="#A25C30"
            value={email}
            onChangeText={(text) => { setEmail(text); setErrorMessage(""); }}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputIconWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }, errorMessage && styles.inputError]}
              placeholder="Enter your password"
              placeholderTextColor="#A25C30"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => { setPassword(text); setErrorMessage(""); }}
              editable={!isLoading}
            />
            <Pressable onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconBtn}>
              <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="#A25C30" />
            </Pressable>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputIconWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }, errorMessage && styles.inputError]}
              placeholder="Re-enter your password"
              placeholderTextColor="#A25C30"
              secureTextEntry={!confirmVisible}
              value={confirmPassword}
              onChangeText={(text) => { setConfirmPassword(text); setErrorMessage(""); }}
              editable={!isLoading}
            />
            <Pressable onPress={() => setConfirmVisible(!confirmVisible)} style={styles.iconBtn}>
              <Ionicons name={confirmVisible ? "eye" : "eye-off"} size={24} color="#A25C30" />
            </Pressable>
          </View>
        </View>

        {/* Sign Up Button */}
        <Pressable
          onPress={handleSignUp}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.signupBtn,
            { backgroundColor: pressed && !isLoading ? "#E17203" : "#FE9A00" },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFCD0" />
          ) : (
            <Text style={styles.signupBtnText}>Sign Up</Text>
          )}
        </Pressable>

        {/* Login link */}
        <Text style={styles.loginContainer}>
          Already have an account?{" "}
          <Text style={styles.loginText} onPress={() => router.replace('/login')}>Login</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFBF0", flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingTop: 20, paddingBottom: 10, paddingHorizontal: 24, minHeight: 50 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  beeLogo: { width: 380, height: 100, alignSelf: "center" },
  title: { textAlign: "center", fontSize: 28, color: "#1A1D16", fontFamily: "Poppins_700Bold", marginBottom: -10 },
  subtitle: { textAlign: "center", fontSize: 16, color: "#A25C30", fontFamily: "Poppins_400Regular", marginBottom: 20 },
  errorContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffedd5", padding: 12, borderRadius: 8, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: "#c2410c" },
  errorText: { color: "#c2410c", fontSize: 14, fontFamily: "Poppins_500Medium", marginLeft: 8, flex: 1 },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 16, color: "#1A1D16", marginBottom: 4, fontFamily: "Poppins_400Regular" },
  inputIconWrapper: { flexDirection: "row", alignItems: "center", position: "relative" },
  input: { width: "100%", minHeight: 45, borderWidth: 2, borderColor: "#A25C30", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 10, backgroundColor: "#FFF", fontSize: 14, color: "#1A1D16", fontFamily: "Poppins_300Light" },
  inputError: { borderColor: "#c2410c" },
  iconBtn: { position: "absolute", right: 10, padding: 8, height: "100%", justifyContent: "center" },
  signupBtn: { borderRadius: 8, paddingVertical: 6, alignItems: "center", marginTop: 10, marginBottom: 25, shadowColor: "#E17203", shadowOpacity: 0.12, shadowRadius: 8, elevation: 2, width: "100%" },
  signupBtnText: { color: "#FFFCD0", fontSize: 18, fontFamily: "Poppins_600SemiBold" },
  loginContainer: { textAlign: "center", fontSize: 13, color: "#1A1D16", fontFamily: "Poppins_400Regular" },
  loginText: { color: "#1A1D16", fontFamily: "Poppins_700Bold", textDecorationLine: "underline" },
});
