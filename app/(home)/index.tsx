import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { fetchProducts, purchaseProduct } from "../../utils/mockApi";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { logout } = useContext(AuthContext)!;
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<number | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const handleBuy = async (productId: number) => {
    setBuying(productId);
    const response = await purchaseProduct(productId);
    setBuying(null);
    if (response.success) alert("Purchase successful!");
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }, index) => (
          <View style={styles.card} key={index}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuy(item.id)}
              disabled={buying === item.id}
            >
              <Text style={styles.buyButtonText}>{buying === item.id ? "Loading..." : "Get now"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#f8f9fa" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  title: { fontSize: 24, fontFamily: "Poppins_600SemiBold" },
  card: { flex: 1, backgroundColor: "#fff", margin: 5, padding: 15, borderRadius: 10, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  image: { width: 80, height: 80, marginBottom: 10 },
  productName: { fontSize: 16, fontFamily: "Poppins_400Regular", textAlign: "center" },
  price: { fontSize: 14, fontWeight: "bold", color: "#28a745" },
  buyButton: { backgroundColor: "#28a745", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 5, marginTop: 8 },
  buyButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
