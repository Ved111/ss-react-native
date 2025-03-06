import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { ActivityIndicator } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold });

  if (!fontsLoaded) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}


