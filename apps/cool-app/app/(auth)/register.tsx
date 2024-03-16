import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { InputLabel } from "~/components/ui/InputLabel";
import { registerUser } from "~/lib/api";

const schema = z
  .object({
    email: z.string().email(),
    confirmEmail: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email addresses do not match",
    path: ["confirmEmail"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SignupView() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = ({ email, password }: FormData) => {
    registerUser(email, password);
    router.replace("/login");
  };

  return (
    <View className="flex h-full flex-col items-center justify-center px-2 bg-background">
      <View className="mx-auto flex w-full flex-col justify-center my-6 px-4 gap-4">
        <View className="flex flex-col my-2 text-center">
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
          <View className="flex gap-2">
            <InputLabel className="sr-only" inputId="confirmEmail">
              Confirm Email
            </InputLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="confirmEmail"
                  placeholder="Confirm your email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="confirmEmail"
            />
            {errors.confirmEmail && (
              <Text className="text-red-500 text-sm">
                {errors.confirmEmail.message}
              </Text>
            )}
          </View>
          <View className="flex gap-2">
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
          <View className="flex gap-2">
            <InputLabel className="sr-only" inputId="confirmPassword">
              Confirm Password
            </InputLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="confirmPassword"
                  secureTextEntry
                  placeholder="Confirm your password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
          <Button onPress={handleSubmit(onSubmit)}>Create Account</Button>
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
