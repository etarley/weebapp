import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";

export default function RootLayout() {
  const { user, isLoading } = { user: null, isLoading: false };
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      if (segments[0] !== "(auth)") {
        router.replace("/login");
      }
    } else if (!isLoading && user && segments[0] === "(auth)") {
      router.replace("/");
    }
  }, [user, isLoading, segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/register"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
