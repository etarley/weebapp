import { cn } from "@weebapp/utils";
import React from "react";
import { Text, TextProps } from "react-native";

export interface InputLabelProps extends TextProps {
  inputId?: string;
  className?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({
  inputId,
  className,
  ...props
}) => {
  return (
    <Text
      {...props}
      nativeID={inputId}
      className={cn("mb-2 text-sm font-medium text-foreground", className)}
    />
  );
};

export { InputLabel };
