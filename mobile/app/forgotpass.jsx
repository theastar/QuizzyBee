import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import { authAPI } from "../services/api";
import ResetCodeModal from "../components/ResetCodeModal";

function ForgotPass() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter code & new password
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [displayResetCode, setDisplayResetCode] = useState("");

  const handleSendResetCode = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.forgotPassword(email);

      // Show the reset code in modal
      setDisplayResetCode(response.resetToken);
      setShowCodeModal(true);
    } catch (error) {
      console.log("Forgot password error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to send reset code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetToken || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await authAPI.resetPassword(email, resetToken, newPassword);

      Alert.alert(
        "Success!",
        "Your password has been reset successfully. Please log in with your new password.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login")
          }
        ]
      );
    } catch (error) {
      console.log("Reset password error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to reset password. Please check your reset code and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalContinue = () => {
    setShowCodeModal(false);
    setStep(2);
  };

  // Step 2: Enter reset code and new password
  if (step === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => setStep(1)} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require("../assets/images/bee_icon.png")} style={styles.beeLogo} />

          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitleCenter}>
            Enter the reset code and your new password
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Reset Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit code"
              placeholderTextColor="#A25C30"
              value={resetToken}
              onChangeText={setResetToken}
              keyboardType="number-pad"
              maxLength={6}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputIconWrapper}>
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                placeholder="Enter new password (min 6 characters)"
                placeholderTextColor="#A25C30"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!passwordVisible}
                editable={!isLoading}
              />
              <Pressable onPress={() => setPasswordVisible((v) => !v)} style={styles.iconBtn}>
                <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="#A25C30" />
              </Pressable>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.inputIconWrapper}>
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                placeholder="Confirm new password"
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

          <Pressable
            onPress={handleResetPassword}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.actionBtn,
              { backgroundColor: pressed && !isLoading ? "#E17203" : "#FE9A00" }
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFCD0" />
            ) : (
              <Text style={styles.actionBtnText}>Reset Password</Text>
            )}
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // Step 1: Enter email
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <Image source={require("../assets/images/bee_icon.png")} style={styles.beeLogo} />

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitleCenter}>Enter your email to receive a reset code</Text>

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

      <Pressable
        onPress={handleSendResetCode}
        disabled={isLoading}
        style={({ pressed }) => [
          styles.actionBtn,
          { backgroundColor: pressed && !isLoading ? "#E17203" : "#FE9A00" }
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFCD0" />
        ) : (
          <Text style={styles.actionBtnText}>Send Reset Code</Text>
        )}
      </Pressable>

      {/* Reset Code Modal */}
      <ResetCodeModal
        visible={showCodeModal}
        resetCode={displayResetCode}
        onContinue={handleModalContinue}
      />
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
});
