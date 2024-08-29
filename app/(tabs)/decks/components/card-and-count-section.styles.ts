import { View, Text, Pressable } from "react-native";
import styled from "styled-components/native";

export const CardsAndCountSection = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 12rem;
  padding: 0.125rem;
`;

export const SeekButton = styled(Pressable)`
  align-items: center;
  justify-content: center;
  background-color: #5e5251;
  border-radius: 0.125rem;
  border-color: #000000;
  border-width: 0.0625rem;
  padding: 0;
  height: 3rem;
  width: 2rem;
  margin: 0.125rem;
`;

export const CardName = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 0.125rem;
  border-color: #000000;
  border-width: 0.0625rem;
  height: 2rem;
  width: 2rem;
`;

export const CountText = styled(Text)`
  font-color: "#ffffff";
`;
