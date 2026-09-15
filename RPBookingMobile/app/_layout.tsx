import { Stack } from "expo-router";

export default function RootLayout() {
   return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="CreateEvent" options={{ title: 'CreateEvent' }} />
      {/* <Stack.Screen name="BackendConnectTest" options={{ title: 'BackendConnectTest' }} /> */}
    </Stack>
  );
}
