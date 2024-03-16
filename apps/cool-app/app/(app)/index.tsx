import React from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/ui/Button";
import { useAuth } from "~/lib/ctx";

// import { Button } from "~/components/ui/Button";

export default function SignupView() {
  const { signOut } = useAuth();
  return (
    <View className="flex h-full flex-col items-center justify-center px-2">
      <Text className="text-3xl text-green-500">You logged in succesfully</Text>
      <Button
        onPress={() => {
          signOut();
        }}
      >
        Log out
      </Button>
    </View>
  );
}
