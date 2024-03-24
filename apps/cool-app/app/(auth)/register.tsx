import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { z } from "zod";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { InputLabel } from "~/components/ui/InputLabel";
import { registerUser } from "~/lib/api";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Introduce a valid email"),
    confirmEmail: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
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
type SchemaKeys = keyof FormData;

export default function SignupView() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async ({ name, email, password }: FormData) => {
    try {
      await registerUser(email, password, name);
      Alert.alert(
        "Registration Successful",
        "You will be redirected to the login page.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/login");
            },
          },
        ],
      );
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
      <View className="mx-auto flex w-full flex-col justify-center my-2 px-4 gap-4">
        <View className="flex flex-col text-center">
          <Text className="text-2xl font-semibold tracking-tight">
            Create an account
          </Text>
          <Text className="text-sm text-muted-foreground">
            Enter your name, email, and password to create your account
          </Text>
        </View>
        <View className="flex gap-4">
          <View className="flex ">
            <InputLabel className="" inputId="name">
              Name
            </InputLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="name"
                  placeholder="Your name"
                  autoCapitalize="words"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
              name="name"
            />
          </View>
          <View className="flex ">
            <InputLabel className="" inputId="email">
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
              name="email"
            />
          </View>
          <View className="flex ">
            <InputLabel className="" inputId="confirmEmail">
              Confirm Email
            </InputLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="confirmEmail"
                  placeholder="Your email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.confirmEmail}
                  helperText={errors.confirmEmail?.message}
                />
              )}
              name="confirmEmail"
            />
          </View>
          <View className="flex ">
            <InputLabel className="" inputId="password">
              Password
            </InputLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="password"
                  secureTextEntry
                  placeholder="Your password"
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
          <View className="flex ">
            <InputLabel className="" inputId="confirmPassword">
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
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
              name="confirmPassword"
            />
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
