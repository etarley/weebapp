import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { InputLabel } from "~/components/ui/InputLabel";
import { loginUser } from "~/lib/api";
import { useAuth } from "~/lib/ctx";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginView() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { signIn } = useAuth();

  const onSubmit = async ({ email, password }: FormData) => {
    const token = await loginUser(email, password);
    signIn(token);
  };

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
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="email"
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-500 text-sm">
                {errors.email.message}
              </Text>
            )}
          </View>
          <View className="grid gap-1">
            <InputLabel className="sr-only" inputId="password">
              Password
            </InputLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="password"
                  secureTextEntry
                  placeholder="********"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="text-red-500 text-sm">
                {errors.password.message}
              </Text>
            )}
          </View>
          <Button onPress={handleSubmit(onSubmit)}>Sign In</Button>
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
