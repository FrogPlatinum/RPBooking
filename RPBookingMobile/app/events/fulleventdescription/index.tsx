import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

{/* The address of our backend API */}
const API_URL = "http://10.0.2.2:5000/api/events";

{/* Type definition for an event */}
type EventItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  ageRes: number;
  price: number;
  minParticipant: number;
  maxParticipant: number;
  privateEvent: boolean;
  status: number | string;
  type: number | string;
};

{/* The backend's event types and their Danish names */}
const eventTypes = ["TabletopRP", "LiveRP"];
const eventTypeNames: Record<string, string> = {
  TabletopRP: "Bordrollespil",
  LiveRP: "Liverollespil",
};

{/* Turns the event type (number or text) into a Danish name */}
const typeLabel = (value: number | string) =>
  typeof value === "number"
    ? eventTypeNames[eventTypes[value]] ?? String(value)
    : eventTypeNames[value] ?? value;

{/* Turns the date into readable Danish text */}
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

{/* Turns the time into readable UI time "HH:MM" */}
const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });

{/* Main component function. Shows one event with its full description */}
export default function FullEventDescription() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  {/* Fetches the event with this id from the backend API, saves if successful, error if not */}
  const getEvent = useCallback(async () => {
    try {
      setError("");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Serveren svarede med status ${response.status}`);
      }
      setEvent(await response.json());
    } catch (e) {
      console.error("Request failed:", e);
      setError("Kunne ikke hente eventet :(");
    } finally {
      setLoading(false);
    }
  }, [id]);

  {/* Runs getEvent when the page opens */}
  useEffect(() => {
    getEvent();
  }, [getEvent]);

  {/* What the page shows on the screen */}
  {/* Header = back button and logo */}
  {/* isLoading = While loading, show a spinner. Then show an error or the event */}
  return (
    <LinearGradient
      colors={["#f2e7b1", "#f3f0de"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#5a4a1f" />
          </Pressable>
          <Image
            source={require("../../../assets/images/TempIcon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#5a4a1f" style={styles.spinner} />
        ) : error || !event ? (
          <Text style={styles.error}>{error || "Eventet blev ikke fundet"}</Text>
        ) : (
          <>
            <Text style={styles.title}>{event.title}</Text>

            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Dato</Text>
                <Text style={styles.value}>
                  {formatDate(event.date)} kl. {formatTime(event.date)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Type</Text>
                <Text style={styles.value}>{typeLabel(event.type)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Pris</Text>
                <Text style={styles.value}>{event.price} kr.</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Alder</Text>
                <Text style={styles.value}>{event.ageRes}+</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Deltagere</Text>
                <Text style={styles.value}>
                  {event.minParticipant}–{event.maxParticipant}
                  {event.privateEvent ? " (privat)" : ""}
                </Text>
              </View>
            </View>

            {!!event.description && (
              <>
                <Text style={styles.sectionTitle}>Beskrivelse</Text>
                <Text style={styles.description}>{event.description}</Text>
              </>
            )}
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

{/* Styles for the components on the page */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
  spinner: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#391b64",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    width: 80,
    color: "#999",
    fontSize: 14,
  },
  value: {
    flex: 1,
    color: "#333",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#391b64", 
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  error: {
    color: "crimson",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});