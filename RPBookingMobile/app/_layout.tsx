import { Stack } from "expo-router";

export default function RootLayout() {
   return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="testgetapidata" options={{ title: 'TestSite' }} />
      <Stack.Screen name="BackendConnectTest" options={{ title: 'BackendConnect' }} />
      <Stack.Screen name="events/index" options={{ title: "Events" }} />
    </Stack>
  );
}
