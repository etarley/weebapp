import { cn } from "@weebapp/utils";
import React, { forwardRef } from "react";
import { Platform, StyleSheet, TextInput, TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  className?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ className, style, ...props }, ref) => {


    return (
      <TextInput
        {...props}
        ref={ref}
        style={[styles.input]}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:border-2 disabled:opacity-50 ios:shadow ios:shadow-black/5",
          className,
        )}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      android: {
        elevation: 1,
      },
    }),
  },
});

Input.displayName = "Input";

export { Input };
