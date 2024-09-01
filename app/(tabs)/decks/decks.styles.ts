import { ScrollView, View } from "react-native";
import styled from "styled-components/native";

export const DecksContainer = styled(ScrollView)`
  display: flex;
  padding: 1rem;
`;

export const DeckPairSection = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const StyledDeck = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: #000000;
  border-width: 0.0625rem;
  border-radius: 0.25rem;
  height: 8rem;
  margin-right: 0.125rem;
  margin-left: 0.125rem;
`;
