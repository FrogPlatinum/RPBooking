import { FlatList, Image, ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";

const API_URL = "http://10.0.2.2:5000/api/events";

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

const eventStatuses = ["Cancelled", "Completed", "Scheduled", "Full"];
const eventTypes = ["TabletopRP", "LiveRP"];

// Viser tekst direkte, hvis backend sender enum som tekst, ellers slås tallet op
const label = (value: number | string, list: string[]) =>
  typeof value === "number" ? list[value] ?? String(value) : value;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const getEvents = useCallback(async () => {
    try {
      setError("");
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Serveren svarede med status ${response.status}`);
      }
      const json = await response.json();
      // Understøtter både [ ... ] og { events: [ ... ] }
      setEvents(Array.isArray(json) ? json : json.events ?? []);
    } catch (e) {
      console.error("Request failed:", e);
      setError("Kunne ikke hente events :(");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <LinearGradient
      colors={["#f2e7b1", "#f3f0de"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#5a4a1f" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshing={isRefreshing}
          onRefresh={() => {
            setRefreshing(true);
            getEvents();
          }}
          ListHeaderComponent={
              <Image
               source={require("../../assets/images/TempIcon.png")}
               style={styles.logo}
               resizeMode="contain"
             /> 
          }
          ListEmptyComponent={
            error === "" ? (
              <Text style={styles.error}>{error}</Text>
            ) : (
              <Text style={styles.empty}>Ingen events endnu</Text>
            ) 
          }
          renderItem={({ item }) => (
            <Pressable style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              {!!item.description && (
                <Text style={styles.description}>{item.description}</Text>
              )}

              <View style={styles.row}>
                <Text style={styles.label}>Dato</Text>
                <Text style={styles.value}>
                  {formatDate(item.date)} kl. {formatTime(item.date)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Type</Text>
                <Text style={styles.value}>{label(item.type, eventTypes)}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.value}>
                  {label(item.status, eventStatuses)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Pris</Text>
                <Text style={styles.value}>{item.price} kr.</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Alder</Text>
                <Text style={styles.value}>{item.ageRes}+</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Deltagere</Text>
                <Text style={styles.value}>
                  {item.minParticipant}–{item.maxParticipant}
                  {item.privateEvent ? " (privat)" : ""}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 24,
    paddingTop: 60,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5a4a1f",
    marginBottom: 20,
  },
  error: {
    color: "crimson",
    marginBottom: 12,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#5a4a1f",
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
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
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
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 16,
  },
});