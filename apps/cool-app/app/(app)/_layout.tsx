import { Redirect, Stack, useRouter } from "expo-router";
import { Text } from "react-native";

import { useAuth } from "~/lib/ctx";

export default function RootLayout() {
  const { isLoading, token } = useAuth();
  const { push } = useRouter();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
