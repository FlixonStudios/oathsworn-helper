import { ScrollView, Pressable, View } from "react-native";
import styled from "styled-components/native";

//==============================================================
// View
//==============================================================

export const CenteredView = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const MainPageContainer = styled(ScrollView)`
  display: flex;
  padding: 16px;
`;

export const Container = styled(CenteredView)``;

export const SkillCheckSection = styled(View)`
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const ColumnSection = styled(View)`
  flex-direction: column;
`;

export const SkillCheckContent = styled(ColumnSection)``;

export const RowSection = styled(View)`
  flex-direction: row;
`;

export const SpacedRowSection = styled(RowSection)`
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: space-between;
`;

export const MightSection = styled(RowSection)`
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: space-around;
`;

export const TargetSection = styled(RowSection)`
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: space-around;
`;

export const ResultsSection = styled(RowSection)``;

export const BorderedCentered = styled(CenteredView)`
  border-radius: 2px;
  border-color: #000000;
  border-width: 1px;
`;

export const CurrentTargetView = styled(BorderedCentered)`
  height: 32px;
  width: 32px;
  background-color: #ffffff;
`;

export const ResultCard = styled(BorderedCentered)`
  width: 48px;
  flex-wrap: wrap;
  margin: 2px;
`;
export const ResultValue = styled(CenteredView)`
  width: 48px;
`;

//==============================================================
// Pressable
//==============================================================

export const CenteredPressable = styled(Pressable)`
  justify-content: center;
  align-items: center;
`;

export const BorderedPressable = styled(CenteredPressable)`
  border-radius: 2px;
  border-color: #000000;
  border-width: 1px;
`;

export const ChangeTargetButton = styled(BorderedPressable)`
  height: 32px;
  width: 32px;
  background-color: #ffffff;
`;

export const CalculateButton = styled(BorderedPressable)`
  height: 32px;
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 16px;
`;

export const CurrentTarget = styled(BorderedCentered)`
  height: 32px;
  width: 32px;
  background-color: #ffffff;
`;

export const SeekButton = styled(BorderedPressable)`
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 32px;
  width: 32px;
`;
