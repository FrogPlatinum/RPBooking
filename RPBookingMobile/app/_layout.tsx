import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";

export default function RootLayout() {
  const {isLoggedIn, hasCompletedSignUp} = useAuthStore();

   return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="index" options={{ title: 'Forside' }} />
        <Stack.Screen name="events" options={{ title: 'Events' }} />
      </Stack.Protected>
      
      <Stack.Protected guard={!isLoggedIn && hasCompletedSignUp}>
      <Stack.Screen name="sign-in"/>
      <Stack.Protected guard={hasCompletedSignUp}>
        <Stack.Screen name="create-account"/> 
      </Stack.Protected>
    </Stack.Protected>
      
    </Stack>
  );
}
