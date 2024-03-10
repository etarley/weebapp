import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { InputLabel } from "~/components/ui/InputLabel";

export default function LoginView() {
  return (
    <View className="flex h-screen w-screen flex-col items-center justify-center px-2">
      {/* <Link href="/">
        <Button variant="ghost" className="absolute left-4 top-4 items-center">
          <AntDesign name="left" size={24} color="black" className="mr-2" />
          Back
        </Button>
      </Link> */}

      <View className="mx-auto flex w-full flex-col justify-center space-y-6 px-4 gap-2">
        <View className="flex flex-col space-y-2 text-center">
          <Text className="text-2xl font-semibold tracking-tight">
            Welcome back
          </Text>
          <Text className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </Text>
        </View>

        <View className="flex gap-2">
          <View className="flex gap-1">
            <InputLabel className="sr-only" inputId="email">
              Email
            </InputLabel>
            <Input
              id="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
            />
          </View>
          <Button>Sign In with Email</Button>
        </View>

        <Text className="text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}
