import { Text } from "react-native";

export function ColoredText(props: { text?: string | number; bgColor: string }) {
  const { text, bgColor } = props;
  return (
    <Text
      style={{
        color: bgColor === `#000000` ? `#ffffff` : `#000000`,
      }}
    >
      {text}
    </Text>
  );
}
