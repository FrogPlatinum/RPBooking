import { useAuthStore } from "@/utils/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Button, Image, StyleSheet, View } from "react-native";
/* importing all functions used in Index. Remember to install expo-linear-gradient */

export default function Login() {
  const router = useRouter();
  const {logIn} = useAuthStore();
  const {logInAsAdmin} = useAuthStore();
  {/* background gradient */}
  {/* logo shown on the front page */}
  {/* button shown on the front page that links to the events page */}
  return (
    <LinearGradient
      colors={["#f2e7b1", "#f3f0de"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require("../assets/images/LogoGames.png")}
        style={styles.logo}
        resizeMode="contain"
        />

    <View style={styles.buttonContainer}>

         <View style={styles.container}>
            <Button title="Log Ind" onPress={logIn} />
        </View>
    
        <View style={styles.container}>
            <Button title="Log Ind Som Admin" onPress={logInAsAdmin} />
        </View>
    
  </View>
 
    </LinearGradient>
  );
}

{/* styling for the front page */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 220,
  },
  buttonContainer: {
    padding: 14,
    position: "absolute",
    bottom: 220,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#5a4a1f",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
