import { Text as RNText } from "react-native";

export function ColoredText(props: { text?: string | number; bgColor: string }) {
  const { text, bgColor } = props;
  return (
    <RNText
      style={{
        color: bgColor === `#000000` ? `#ffffff` : `#000000`,
      }}
    >
      {text}
    </RNText>
  );
}
