import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Welcome',headerShown: false  }} />
      <Stack.Screen name="loginScreen" options={{ title: 'loginScreen',headerShown: false  }} />
      <Stack.Screen name="signupScreen" options={{ title: 'signupScreen',headerShown: false  }} />
      <Stack.Screen name="ExerciseDetails" options={{ title: 'Exercise Details',headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
