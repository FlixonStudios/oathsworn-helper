import { BorderedCentered } from "@/constants/styles";
import styled from "styled-components/native";

export const DeckPairSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const StyledDeck = styled(BorderedCentered)`
  border-radius: 4px;
  flex: 1;
  margin-right: 2px;
  margin-left: 2px;
  min-height: 112px;
`;
