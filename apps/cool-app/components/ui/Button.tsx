import { cn } from "@weebapp/utils";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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
  className?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: object;
}

export const Button = ({
  variant = "primary",
  icon,
  loading = false,
  children,
  className,
  disabled = false,
  onPress,
  style,
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
    className,
  );

  const iconClasses = cn("mr-2", textClasses);

  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);
  const rippleValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  const handlePressIn = () => {
    scaleValue.value = withSpring(0.95);
    opacityValue.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scaleValue.value = withSpring(1);
    opacityValue.value = withSpring(1);
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const renderIcon = icon && !loading && (
    <Text className={cn(textClasses, iconClasses)}>{icon}</Text>
  );

  const renderLoading = loading && (
    <View className="flex flex-row opacity-50">
      <ActivityIndicator size="small" className={cn(iconClasses)} />
      <Text className={cn(textClasses)}>Loading</Text>
    </View>
  );

  const renderChildren = !loading && (
    <Text className={textClasses}>{children}</Text>
  );

  return (
    <TapGestureHandler
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === 5) {
          handlePress();
        }
      }}
      onBegan={handlePressIn}
      onEnded={handlePressOut}
      onFailed={handlePressOut}
    >
      <Animated.View
        className={cn(
          buttonClasses,
          loading && "opacity-50",
          disabled && "opacity-50",
        )}
        style={[animatedStyle, style]}
      >
        {renderIcon}
        {renderLoading}
        {renderChildren}
      </Animated.View>
    </TapGestureHandler>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
    "icon",
  ]),
  icon: PropTypes.node,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
};
