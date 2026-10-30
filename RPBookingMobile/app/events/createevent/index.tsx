import { Pressable, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

{/* Main component function. Page for adding a new event */}
export default function CreateEventPage() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#f2e7b1", "#f3f0de"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={12}>
        <Ionicons name="arrow-back" size={24} color="#5a4a1f" />
      </Pressable>

      <Text style={styles.title}>Tilføj event</Text>
    </LinearGradient>
  );
}

{/* Styles for the components on the page */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5a4a1f",
    textAlign: "center",
  },
});