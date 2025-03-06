import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";


export default function LoginScreen() {
  const { login } = useContext(AuthContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const router = useRouter();


  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    router.replace("/(home)");

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <Text style={styles.footerText}>
  Don't have an account?  
  <Text style={styles.signupText} onPress={() => router.replace("/(auth)")}> Sign Up</Text>
</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa", padding: 20 },
  title: { fontSize: 28, fontFamily: "Poppins_600SemiBold", marginBottom: 5 },
  subtitle: { fontSize: 16, fontFamily: "Poppins_400Regular", color: "#6c757d", marginBottom: 20 },
  input: { width: "100%", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 12, fontSize: 16, fontFamily: "Poppins_400Regular", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  button: { backgroundColor: "#28a745", padding: 12, borderRadius: 10, width: "100%", alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footerText: { marginTop: 15, fontSize: 14, color: "#6c757d" },
  signupText: { color: "#28a745", fontWeight: "bold" },
});
