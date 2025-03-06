import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const { signup } = useContext(AuthContext)!; // Use signup instead of login
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
     
      alert("Account created successfully!");
      router.replace("/(auth)/login");
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?  
        <Text style={styles.loginText} onPress={() => router.replace("/(auth)/login")}> Log in</Text>
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
  errorText: { color: "red", marginBottom: 10 },
  footerText: { marginTop: 15, fontSize: 14, color: "#6c757d" },
  loginText: { color: "#28a745", fontWeight: "bold" },
});

