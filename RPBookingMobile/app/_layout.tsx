import { Stack } from "expo-router";

export default function RootLayout() {
   return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="CreateEvent" options={{ title: 'Opret Event' }} />
      {/* <Stack.Screen name="BackendConnectTest" options={{ title: 'BackendConnectTest' }} /> */}
      <Stack.Screen name="GetEvents" options={{ title: 'Se Alle Events' }} />
      {/* <Stack.Screen name="templates/testgetapidata" options={{ title: 'testgetapidata' }} /> */}
       <Stack.Screen name="GetEventById" options={{ title: 'Se Event' }} />
    </Stack>
  );
}
