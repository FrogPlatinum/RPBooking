import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createEvent as postEvent } from "@/services/eventService";
import { CreateEvent } from "@/types/event";

//{/* The address of our backend API */}
//const API_URL = "http://10.0.2.2:5000/api/events";

{/* Danish names in the same order as the backend's enums (the index is the number we send) */}
const statusOptions = ["Aflyst", "Afsluttet", "Planlagt", "Fuldt booket"]; // Cancelled, Completed, Scheduled, Full
const typeOptions = ["Bordrollespil", "Liverollespil"];                   // TabletopRP, LiveRP

{/* Turns text into a number, and accepts both "150,5" and "150.5" */}
const toNumber = (text: string) => Number(text.replace(",", "."));

{/* Main component function. Form page for creating a new event */}
export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ageRes, setAgeRes] = useState("");
  const [price, setPrice] = useState("");
  const [minParticipant, setMinParticipant] = useState("");
  const [maxParticipant, setMaxParticipant] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [privateEvent, setPrivateEvent] = useState(false);
  const [status, setStatus] = useState(2); // "Planlagt" as default for a new event
  const [type, setType] = useState(0);
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState("");

  {/* Checks the fields before sending. Returns an error text, or "" if everything is fine */}
  const validate = () => {
    if (!title.trim()) return "Skriv en titel";
    if (!parseDate(date)) return "Dato skal skrives som DD-MM-ÅÅ, fx 01-03-26";
    if (!/^\d{2}:\d{2}$/.test(time)) return "Tidspunkt skal skrives som TT:MM";

    if (!address.trim()) return "Skriv en adresse";
    if (!city.trim()) return "Skriv en by";

    const numbers = [ageRes, price, minParticipant, maxParticipant];
    if (numbers.some((n) => n.trim() === "" || Number.isNaN(toNumber(n)))) {
      return "Alder, pris og deltagere skal være tal";
    }
    if (toNumber(minParticipant) > toNumber(maxParticipant)) {
      return "Min. deltagere kan ikke være større end maks. deltagere";
    }
    return "";
  };

  {/* Turns "DD-MM-YY" into "YYYY-MM-DD" for the backend. Returns "" if the date is not valid. Both /,. and - are accepted */}
const parseDate = (text: string) => {
  const match = text.trim().match(/^(\d{2})[-.:/](\d{2})[-.:/](\d{2})$/);
  if (!match) return "";

  const [, dd, mm, yy] = match;
  const year = 2000 + Number(yy);

  // JavaScript turns 31-02 into 3 March, so we check that the date stayed the same
  const check = new Date(year, Number(mm) - 1, Number(dd));
  if (
    check.getFullYear() !== year ||
    check.getMonth() !== Number(mm) - 1 ||
    check.getDate() !== Number(dd)
  ) {
    return "";
  }

  return `${year}-${mm}-${dd}`;
};

  {/* Sends the new event to the backend with POST, and goes back to the list if it succeeds */}
  const createEvent = async () => {
  const problem = validate();
  if (problem) {
    setError(problem);
    return;
  }

    {/* The new event, built from the form fields */}
  const newEvent: CreateEvent = {
    title: title.trim(),
    description: description.trim(),
    address: address.trim(),
    city: city.trim(),
    date: `${parseDate(date)}T${time}:00`,
    ageRes: toNumber(ageRes),
    price: toNumber(price),
    minParticipant: toNumber(minParticipant),
    maxParticipant: toNumber(maxParticipant),
    privateEvent,
    status,
    type,
  };

  try {
    setSaving(true);
    setError("");
    await postEvent(newEvent);
    router.back();
  } catch (e) {
    console.error("Request failed:", e);
    setError("Kunne ikke oprette eventet :(");
  } finally {
    setSaving(false);
  }
};

  {/* What the page shows on the screen */}
  {/* KeyboardAvoidingView + ScrollView = the keyboard does not cover the fields */}
  return (
    <LinearGradient
      colors={["#f2e7b1", "#f3f0de"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={12}>
              <Ionicons name="arrow-back" size={24} color="#5a4a1f" />
            </Pressable>
            <Text style={styles.heading}>Tilføj event</Text>
          </View>

          <Text style={styles.label}>Titel</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Fx Hækkens Hof" />

          <Text style={styles.label}>Beskrivelse</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Fortæl om eventet"
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>Adresse</Text>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Fx Vestergade 12" />

          <Text style={styles.label}>By</Text>
          <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Fx Odense" />

          <View style={styles.twoColumns}>
            <View style={styles.column}>
              <Text style={styles.label}>Dato</Text>
              <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="DD-MM-YY" />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Tidspunkt</Text>
              <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="HH:MM" />
            </View>
          </View>

          <View style={styles.twoColumns}>
            <View style={styles.column}>
              <Text style={styles.label}>Pris (kr.)</Text>
              <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="0" />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Aldersgrænse</Text>
              <TextInput style={styles.input} value={ageRes} onChangeText={setAgeRes} keyboardType="numeric" placeholder="18" />
            </View>
          </View>

          <View style={styles.twoColumns}>
            <View style={styles.column}>
              <Text style={styles.label}>Min. deltagere</Text>
              <TextInput style={styles.input} value={minParticipant} onChangeText={setMinParticipant} keyboardType="numeric" placeholder="4" />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Maks. deltagere</Text>
              <TextInput style={styles.input} value={maxParticipant} onChangeText={setMaxParticipant} keyboardType="numeric" placeholder="20" />
            </View>
          </View>

          {/* Event type: one button per option, the chosen one is highlighted */}
          <Text style={styles.label}>Type</Text>
          <View style={styles.chips}>
            {typeOptions.map((name, index) => (
              <Pressable
                key={name}
                style={[styles.chip, type === index && styles.chipActive]}
                onPress={() => setType(index)}
              >
                <Text style={[styles.chipText, type === index && styles.chipTextActive]}>{name}</Text>
              </Pressable>
            ))}
          </View>

          {/* Event status: same idea as type */}
          <Text style={styles.label}>Status</Text>
          <View style={styles.chips}>
            {statusOptions.map((name, index) => (
              <Pressable
                key={name}
                style={[styles.chip, status === index && styles.chipActive]}
                onPress={() => setStatus(index)}
              >
                <Text style={[styles.chipText, status === index && styles.chipTextActive]}>{name}</Text>
              </Pressable>
            ))}
          </View>

          {/* Private event: on/off switch */}
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Privat event</Text>
            <Switch
              value={privateEvent}
              onValueChange={setPrivateEvent}
              trackColor={{ false: "#ccc", true: "#5a4a1f" }}
              thumbColor="#fff"
            />
          </View>

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            style={({ pressed }) => [styles.submit, (pressed || isSaving) && styles.submitPressed]}
            onPress={createEvent}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Opret event</Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 48,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5a4a1f",
  },
  label: {
    color: "#5a4a1f",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e3d9b0",
  },
  multiline: {
    minHeight: 110,
  },
  twoColumns: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#5a4a1f",
    backgroundColor: "#fff",
  },
  chipActive: {
    backgroundColor: "#5a4a1f",
  },
  chipText: {
    color: "#5a4a1f",
    fontSize: 14,
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  switchLabel: {
    color: "#5a4a1f",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "crimson",
    marginTop: 16,
    textAlign: "center",
  },
  submit: {
    backgroundColor: "#5a4a1f",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  submitPressed: {
    opacity: 0.7,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});