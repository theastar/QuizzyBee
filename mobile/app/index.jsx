import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, BackHandler } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

function Index() {
  const router = useRouter();
  const logoAnim = useRef(new Animated.Value(80)).current; // start 80 below
  const subtitleFade = useRef(new Animated.Value(0)).current;
  const buttonsFade = useRef(new Animated.Value(0)).current;
  const footerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Prevent back button navigation on splash screen
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Return true to prevent default back behavior
      return true;
    });

    // Animation sequence
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(footerFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Cleanup back handler on unmount
    return () => backHandler.remove();
  }, []);

  return (
    <LinearGradient
      colors={["#FDC700", "#FEA700"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        {/* Animated logo */}
        <Animated.View style={{ transform: [{ translateY: logoAnim }], alignItems: "center" }}>
          <Image
            source={require("../assets/images/quizzybee_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Subtitle fade */}
        <Animated.View style={{ opacity: subtitleFade, width: "100%", alignItems: "center" }}>
          <Text style={styles.subtitle}>Your Ultimate Study Companion</Text>
        </Animated.View>

        {/* Buttons fade */}
        <Animated.View style={{ opacity: buttonsFade, width: "100%", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={() => router.replace('/login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.replace('/signup')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer fade */}
        <Animated.View style={{ opacity: footerFade, width: "100%", alignItems: "center" }}>
          <Text style={styles.footerText}>Learn Smarter, Quiz Faster, Bee Better.</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 480,
    height: 280,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    width: "80%",
    height: 43,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#A25C30",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#A85C00",
    fontSize: 16,
  },
  footerText: {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    fontSize: 13,
    marginTop: 40,
    textAlign: "center",
  },
});