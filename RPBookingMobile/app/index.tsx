import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//importing all functions used in Index. Remember to install expo-linear-gradient
export default function Index() {

  return (
    //background gradient
    <LinearGradient
      colors={["#f2e7b1", "#f3f0de"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      //logo shown on the front page
      <Image
        source={require("../assets/images/TempIcon.png")}
        style={styles.logo}
        resizeMode="contain"
        />

//button shown on the front page that links to the events page
    <View style={styles.buttonContainer}>
      <Link href="events" asChild>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Se Events</Text>
        </Pressable>
        </Link>
    </View>
    </LinearGradient>
  );
}

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
