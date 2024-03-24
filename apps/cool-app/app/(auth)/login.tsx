import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
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
  email: z.string().email("Introduce a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;
type SchemaKeys = keyof FormData;

export default function LoginView() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { signIn } = useAuth();
  const router = useRouter();

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const { token, user } = await loginUser(email, password);
      signIn(token, user);
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.cause as SchemaKeys, { message: error.message });
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <View className="flex h-full flex-col items-center justify-center px-2 bg-background">
      <View className="mx-auto flex w-full flex-col px-4">
        <View className="flex flex-col my-4 text-center">
          <Text className="text-2xl font-semibold tracking-tight">
            Welcome back
          </Text>
          <Text className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </Text>
        </View>
        <View className="flex gap-4 mb-8">
          <View className="grid gap-1">
            <InputLabel inputId="email">Email</InputLabel>
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
              name="email"
            />
          </View>
          <View className="grid gap-1">
            <View className="flex flex-row items-center justify-between">
              <InputLabel inputId="password">Password</InputLabel>
              {/* <Link href="/forgot-password">
                <Text className="text-brand underline underline-offset-4 text-sm text-muted-foreground">
                  Forgot your password?
                </Text>
              </Link> */}
            </View>
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
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
              name="password"
            />
          </View>
          <Button onPress={handleSubmit(onSubmit)}>Sign In</Button>
        </View>
        <View className="flex flex-row items-center justify-center gap-2">
          <Text className="text-center text-sm text-foreground">
            Don't have an account?
          </Text>
          <Text className="text-center text-sm text-foreground">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4 text-muted-foreground"
            >
              Sign Up
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
