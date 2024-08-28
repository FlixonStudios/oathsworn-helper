import { Button, View } from "react-native";
import styled from "styled-components/native";

export const StyledButton = styled(Button)`
  type: button;
  height: 2rem;
`;

export const Container = styled(View)`
  display: flex;
  padding: 1rem;
`;

export const StyledView = styled(View)`
  flex: 1;
  justifycontent: "center";
  alignitems: "center";
`;
export const StyledDeck = styled(View)`
  height: 6rem;
  width: 4rem;
  border-color: #000000;
`;

export const DeckSection = styled(View)`
  margin-top: 1rem;
`;
export const StyledCard = styled(View)`
  height: 3rem;
  width: 3rem;
`;
