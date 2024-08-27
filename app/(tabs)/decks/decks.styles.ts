import { Button, View } from "react-native";
import styled from "styled-components/native";

export const StyledButton = styled(Button)`
  type: button;
  height: 2rem;
`;

export const Container = styled(View)`
  display: flex;
`;

export const StyledView = styled(View)`
  flex: 1;
  justifycontent: "center";
  alignitems: "center";
`;

export const StyledCard = styled(View)`
  height: 3rem;
  width: 3rem;
`;
