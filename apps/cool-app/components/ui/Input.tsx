import { cn } from "@weebapp/utils";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

export interface InputProps extends TextInputProps {
  className?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ className, style, label, helperText, error, ...props }, ref) => {
    return (
      <View>
        {label && (
          <Text className="mb-1 text-sm font-medium text-foreground">
            {label}
          </Text>
        )}
        <TextInput
          {...props}
          ref={ref}
          style={[styles.input, error && styles.inputError, style]}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:border-2 disabled:opacity-50 ios:shadow ios:shadow-black/5",
            error && "border-red-500",
            className,
          )}
        />
        {helperText && (
          <Text className="mt-1 text-xs text-muted-foreground">
            {helperText}
          </Text>
        )}
        {error && (
          <Text className="mt-1 text-xs text-red-500">Error message</Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      android: {
        elevation: 1,
      },
      ios: {
        fontFamily: "System",
      },
    }),
  },
  inputError: {
    borderColor: "red",
  },
});

Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
};

export { Input };
