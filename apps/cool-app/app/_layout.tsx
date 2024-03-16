import { Stack } from "expo-router";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAuth } from "~/lib/ctx";
import "../global.css";

export default function RootLayout() {
  const { isLoading, token } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {token ? (
          <Stack>
            <Stack.Screen name="(app)/index" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <Stack>
            <Stack.Screen
              name="(auth)/login"
              options={{
                headerShown: false,
                animation: "none",
              }}
            />
            <Stack.Screen
              name="(auth)/register"
              options={{
                headerShown: false,
                animation: "none",
              }}
            />
          </Stack>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
