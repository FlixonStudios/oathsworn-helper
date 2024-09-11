import { Pressable, PressableProps } from "react-native";

interface Props extends PressableProps {
  Component?: React.ComponentType<PressableProps>;
}

export function AnimatedPressable<T>(props: Props) {
  const { children, Component = DefaultPressable, ...otherProps } = props;

  return (
    <Component
      style={({ pressed }) => [
        pressed ? { transform: [{ scale: 0.95 }] } : null,
        { backgroundColor: pressed ? "rgb(210, 230, 255)" : "white" },
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