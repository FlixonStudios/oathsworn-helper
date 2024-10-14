import { Text as RNText, StyleProp, TextProps, TextStyle } from "react-native";

export function ColoredText(props: {
  text?: string | number;
  bgColor: string;
}) {
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

export type TextTemplate = StyleProp<TextStyle>;

export type BaseTextProps = TextProps & { children?: any };

export const Text = {
  H1: ({ children, ...rest }: BaseTextProps) =>
    getText({ fontSize: 32, fontWeight: "600" }, { children, ...rest }),
  Body: ({ children, ...rest }: BaseTextProps) =>
    getText({ fontSize: 16 }, { children, ...rest }),
};

function getText(textTemplate: TextTemplate, others: BaseTextProps) {
  const { children, ...rest } = others;
  const styleProps = [textTemplate, rest.style];
  return (
    <RNText {...rest} style={styleProps}>
      {children}
    </RNText>
  );
}
