import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.element}>Edit app/index.tsx to edit this screen.</Text>
      <Text>Her starter vores SUPER seje event planner!! :D</Text>
      <Link href="/testgetapidata">Gå til Api Test!</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "purple",
  },
  element: {
    color: "#a8ebeb"
  }
})
