import styled from "styled-components/native";

export const DecksContainer = styled.ScrollView`
  display: flex;
  padding: 16px;
`;

export const DeckPairSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const StyledDeck = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: #000000;
  border-width: 1px;
  border-radius: 4px;
  height: 96px;
  margin-right: 2px;
  margin-left: 2px;
`;
