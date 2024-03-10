import { cn } from "@weebapp/utils";
import { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "icon";

interface ButtonProps {
  variant?: ButtonVariant;
  icon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
  className?: string; // Add the className prop here
}

export const Button = ({
  variant = "primary",
  icon,
  loading = false,
  children,
  className, // Add the className prop to the destructured props
}: ButtonProps) => {
  const textClasses = cn("font-bold text-center", {
    "text-primary-foreground": variant === "primary",
    "text-secondary-foreground": variant === "secondary",
    "text-destructive-foreground": variant === "destructive",
    "text-accent-foreground": variant === "outline" || variant === "ghost",
    "text-primary": variant === "link",
  });

  const buttonClasses = cn(
    "py-2 px-4 rounded-md flex-row items-center justify-center",
    {
      "bg-primary hover:bg-primary/90": variant === "primary",
      "bg-secondary": variant === "secondary",
      "bg-destructive": variant === "destructive",
      "border border-input": variant === "outline",
      "bg-transparent": variant === "ghost" || variant === "link",
      "p-0": variant === "icon",
    },
    className // Add the className prop to the buttonClasses
  );

  const iconClasses = "mr-2";

  return (
    <Pressable className={cn(buttonClasses, loading && "opacity-50")}>
      {icon && !loading && (
        <Text className={cn(textClasses, iconClasses)}>{icon}</Text>
      )}
      {loading ? (
        <View className="flex flex-row">
          <ActivityIndicator
            size="small"
            color="white"
            className={cn(iconClasses)}
          />
          <Text className={cn(textClasses)}>Loading</Text>
        </View>
      ) : (
        <Text className={textClasses}>{children}</Text>
      )}
    </Pressable>
  );
};