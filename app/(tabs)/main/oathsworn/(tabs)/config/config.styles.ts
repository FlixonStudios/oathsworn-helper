import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

export const commonRadioButtonStyles = {
  size: 36,
  containerStyle: { margin: 8 },
};

export const radioGroupStyles: StyleProp<ViewStyle> = {
  alignItems: "flex-start",
};

export const LabelContainer = styled.View`
  padding: 12px;
  flex: 1;
`;

export const Divider = styled.View`
  border-color: "#000000";
  width: 100%;
`
