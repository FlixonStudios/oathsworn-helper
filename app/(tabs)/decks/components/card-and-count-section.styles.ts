import styled from "styled-components/native";

export const CardsAndCountSection = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 192px;
  padding: 2px;
`;

export const SeekButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  background-color: #5e5251;
  border-radius: 2px;
  border-color: #000000;
  border-width: 1px;
  padding: 0;
  height: 48px;
  width: 16px;
  margin: 2px;
`;

export const CardName = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 2px;
  border-color: #000000;
  border-width: 1px;
  height: 32px;
  width: 32px;
`;

export const CountText = styled.Text`
  color: #ffffff;
`;
