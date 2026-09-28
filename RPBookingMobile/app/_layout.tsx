import { Stack } from "expo-router";

export default function RootLayout() {
   return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="testgetapidata" options={{ title: 'TestSite' }} />
      <Stack.Screen name="CreateEvent" options={{ title: 'Opret Event' }} />
      <Stack.Screen name="GetEvents" options={{ title: 'Se Alle Events' }} />
      <Stack.Screen name="GetEventById" options={{ title: 'Se ét Event' }} />
      <Stack.Screen name="EditEvent" options={{ title: 'Rediger Event' }} />
    </Stack>
  );
}
