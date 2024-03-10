import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { InputLabel } from "~/components/ui/InputLabel";

export default function SignupView() {
  return (
    <View className="flex h-screen w-screen flex-col items-center justify-center px-2">
      {/* <Link href="/login">
        <Button variant="ghost" className="absolute right-4 top-4">
          Login
        </Button>
      </Link> */}

      <View className="mx-auto flex w-full flex-col justify-center space-y-6 px-4 gap-4">
        <View className="flex flex-col space-y-2 text-center">
          {/* <AntDesign name="home" size={24} color="black" className="mx-auto" /> */}
          <Text className="text-2xl font-semibold tracking-tight">
            Create an account
          </Text>
          <Text className="text-sm text-muted-foreground">
            Enter your email below to create your account
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
          <Button>Create Account</Button>
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
