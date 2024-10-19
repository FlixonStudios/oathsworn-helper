import React from "react";
import { Pressable, PressableProps } from "react-native";

interface Props extends PressableProps {
  Component?: React.ComponentType<PressableProps>;
  color?: string;
}

export function AnimatedPressable<T>(props: Props) {
  const {
    children,
    Component = DefaultPressable,
    color,
    style,
    ...otherProps
  } = props;

  const baseStyles = typeof style !== "function" ? style : {};

  const colorWhenPressed = "rgb(210, 230, 255)";

  const colorWhenNotPressed = color
    ? color
    : baseStyles
    ? (baseStyles as any)["backgroundColor"]
    : "white";

  return (
    <Component
      style={({ pressed }) => [
        pressed ? { transform: [{ scale: 0.95 }] } : null,
        {
          backgroundColor: pressed ? colorWhenPressed : colorWhenNotPressed,
        },
        baseStyles,
      ]}
      {...otherProps}
    >
      {children}
    </Component>
  );
}
// Default Pressable component as a fallback
const DefaultPressable = (props: PressableProps) => (
  <Pressable {...props}>{props.children}</Pressable>
);
