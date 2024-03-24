import { cn } from "@weebapp/utils";
import PropTypes from "prop-types";
import React from "react";
import { Text, TextProps } from "react-native";

export interface InputLabelProps extends TextProps {
  inputId?: string;
  className?: string;
  required?: boolean;
}

const InputLabel: React.FC<InputLabelProps> = ({
  inputId,
  className,
  required,
  style,
  ...props
}) => {
  return (
    <Text
      {...props}
      nativeID={inputId}
      accessibilityLabel={props.children as string}
      style={[style]}
      className={cn(
        "mb-2 font-medium text-foreground",
        required && "after:text-red-500 after:content-['*']",
        className,
      )}
    />
  );
};

InputLabel.propTypes = {
  inputId: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
};

export { InputLabel };
