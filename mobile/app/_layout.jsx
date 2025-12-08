import { Stack } from "expo-router";
import { NotesProvider } from "../context/NotesContext";
import { FlashcardsProvider } from "../context/FlashcardsContext";
import { CalendarProvider } from "../context/CalendarContext";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Protected route logic
  useProtectedRoute();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4F4E28" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NotesProvider>
        <FlashcardsProvider>
          <CalendarProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade",
                animationDuration: 200,
                contentStyle: {
                  backgroundColor: "#FFFBF0",
                },
              }}
            />
          </CalendarProvider>
        </FlashcardsProvider>
      </NotesProvider>
    </SafeAreaProvider>
  );
}

export default RootLayout;
