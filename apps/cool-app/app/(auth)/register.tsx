import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { InputLabel } from "~/components/ui/InputLabel";

export default function SignupView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
     <View className="flex h-full flex-col items-center justify-center px-2 bg-background">
      <View className="mx-auto flex w-full flex-col justify-center my-6 px-4 gap-4">
        <View className="flex flex-col my-2 text-center">
          {/* <AntDesign name="home" size={24} color="black" className="mx-auto" /> */}
          <Text className="text-2xl font-semibold tracking-tight">
            Create an account
          </Text>
          <Text className="text-sm text-muted-foreground">
            Enter your email and password to create your account
          </Text>
        </View>
        <View className="flex gap-4">
          <View className="flex gap-2">
            <InputLabel className="sr-only" inputId="email">
              Email
            </InputLabel>
            <Input
              id="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View className="flex gap-2">
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
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Button >Create Account</Button>
        </View>
        <Text className="text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </Text>
      </View>
    </View>
  );
}
