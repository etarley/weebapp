import { cn } from "@weebapp/utils";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
  className?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  style?: object;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ className, style, label, helperText, error, ...props }, ref) => {
    return (
      <View className="flex gap-0.5">
        {label && (
          <Text className="mb-1 text-sm font-medium text-foreground">
            {label}
          </Text>
        )}
        <TextInput
          {...props}
          ref={ref}
          style={[style]}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:border-2 disabled:opacity-50 ios:shadow ios:shadow-black/5 `,
            className,
            error && "border-destructive border-2 focus:border-destructive",
          )}
        />
        {helperText && (
          <Text className={cn("text-sm", error && "text-destructive")}>
            {helperText}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
};

export { Input };
