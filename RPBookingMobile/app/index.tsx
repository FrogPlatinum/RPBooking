import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.element}>Edit app/index.tsx to edit this screen.</Text>
      <Text>Her starter vores SUPER seje event planner!! :D</Text>
      {/* <Link href="/BackendConnectTest">Gå til Api Test!</Link> */}
      <Link style={styles.link} href="/CreateEvent">Opret Event!</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2e7b1",
  },
  element: {
    color: "#2e9696"
  },
  link: {
    textDecorationLine: "underline",
  }

})
