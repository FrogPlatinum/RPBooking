import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";

export default function RootLayout() {
  const {isAdmin} = useAuthStore();

   return (
    <Stack screenOptions={{ headerShown: false }}>
     <Stack.Protected guard={isAdmin} >
        <Stack.Screen name="createevent" options={{title: 'Opret Event'}}/>
    </Stack.Protected>
    
    <Stack.Screen name="fulleventdescription" options={{title: ''}}/>

    </Stack>
  );
}
