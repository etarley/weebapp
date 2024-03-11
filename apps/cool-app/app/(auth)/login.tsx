import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { InputLabel } from "~/components/ui/InputLabel";

export default function LoginView() {
  return (
    <View className="flex h-full flex-col items-center justify-center px-2 bg-background">
      <View className="mx-auto flex w-full flex-col justify-center space-y-6 px-4">
        <View className="flex flex-col my-4 text-center">
          <Text className="text-2xl font-semibold tracking-tight">
            Welcome back
          </Text>
          <Text className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </Text>
        </View>
        <View className="flex gap-4 mb-16">
          <View className="grid gap-1">
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
          <View className="grid gap-1">
            <InputLabel className="sr-only" inputId="password">
              Password
            </InputLabel>
            <Input
              id="password"
              secureTextEntry
              placeholder="********"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
            />
          </View>
          <Button>Sign In</Button>
        </View>
        <Text className="text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don't have an account? Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}