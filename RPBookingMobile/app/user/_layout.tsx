import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";

export default function RootLayout() {
  const {isLoggedIn, hasCompletedSignUp, isAdmin} = useAuthStore();

   return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn && isAdmin}>
        <Stack.Screen name="index" options={{ title: 'Brugere' }} />
      </Stack.Protected>
      
      <Stack.Protected guard={!isLoggedIn && hasCompletedSignUp}>
        <Stack.Screen name="Login"/>
      </Stack.Protected>

        <Stack.Protected guard={!hasCompletedSignUp}>
        <Stack.Screen name="create-account"/> 
        
        </Stack.Protected>
      
    </Stack>
  );
}
