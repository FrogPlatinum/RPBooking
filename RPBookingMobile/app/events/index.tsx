import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

{/* easy and quick mockup of events page. This is a temporary solution until the backend is connected and the events are fetched from the database. */}
type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
};

{/* mockup of events */}
const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Sejt Event",
    date: "14. november 2026",
    time: "18:00",
    location: "Aarhus",
  },
  {
    id: "2",
    title: "Endnu et sejt event",
    date: "5. december 2026",
    time: "14:00",
    location: "Silkeborg",
  },
  {
    id: "3",
    title: "Og ENDNU et sejt event",
    date: "19. december 2026",
    time: "19:30",
    location: "Viborg",
  },
];

{/* main function for the events page with data in rows */}
{/* background gradient will be changed to be the same on all pages */ }
export default function Events() {
  return (
    <LinearGradient
      colors={["#f2e7b1", "#f3f0de"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <FlatList
        data={EVENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.heading}>Kommende events</Text>}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Dato</Text>
              <Text style={styles.value}>
                {item.date} kl. {item.time}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Sted</Text>
              <Text style={styles.value}>{item.location}</Text>
            </View>
          </Pressable>
        )}
      />
    </LinearGradient>
  );
}

{/* styling for the events page */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5a4a1f",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5a4a1f",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    width: 50,
    color: "#999",
    fontSize: 14,
  },
  value: {
    flex: 1,
    color: "#333",
    fontSize: 14,
  },
});