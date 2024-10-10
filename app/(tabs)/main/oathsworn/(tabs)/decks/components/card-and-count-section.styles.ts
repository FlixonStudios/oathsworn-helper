import {
  BorderedCentered,
  BorderedPressable,
  CenteredRowSection,
  CenteredView,
  MiniSquareView,
} from "@/constants/styles";
import styled from "styled-components/native";

export const CardsAndCountSection = styled(CenteredRowSection)`
  display: flex;
  flex-wrap: wrap;
  max-width: 192px;
  padding: 2px;
`;

export const SeekButton = styled(BorderedPressable)`
  padding: 0;
  height: 48px;
  width: 32px;
  margin: 2px;
`;

export const CardCountContainer = styled(CenteredView)``;

export const CardName = styled(MiniSquareView)``;

export const CountText = styled.Text`
  color: #ffffff;
`;
