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
  padding: 1rem;
`;

export const Container = styled(CenteredView)``;

export const SkillCheckSection = styled(View)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const ColumnSection = styled(View)`
  flex-direction: column;
`;

export const SkillCheckContent = styled(ColumnSection)``;

export const RowSection = styled(View)`
  flex-direction: row;
`;

export const SpacedRowSection = styled(RowSection)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

export const MightSection = styled(RowSection)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: space-around;
`;

export const TargetSection = styled(RowSection)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: space-around;
`;

export const ResultsSection = styled(RowSection)``;

export const BorderedCentered = styled(CenteredView)`
  border-radius: 0.125rem;
  border-color: #000000;
  border-width: 0.0625rem;
`;

export const CurrentTargetView = styled(BorderedCentered)`
  height: 2rem;
  width: 2rem;
  background-color: #ffffff;
`;

export const ResultCard = styled(BorderedCentered)`
  width: 3rem;
  flex-wrap: wrap;
`;
export const ResultValue = styled(BorderedCentered)`
  width: 3rem;
`;

//==============================================================
// Pressable
//==============================================================

export const CenteredPressable = styled(Pressable)`
  justify-content: center;
  align-items: center;
`;

export const BorderedPressable = styled(CenteredPressable)`
  border-radius: 0.125rem;
  border-color: #000000;
  border-width: 0.0625rem;
`;

export const ChangeTargetButton = styled(BorderedPressable)`
  height: 2rem;
  width: 2rem;
  background-color: #ffffff;
`;

export const CalculateButton = styled(BorderedPressable)`
  height: 2rem;
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 1rem;
`;

export const CurrentTarget = styled(BorderedCentered)`
  height: 2rem;
  width: 2rem;
  background-color: #ffffff;
`;

export const SeekButton = styled(BorderedPressable)`
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 2rem;
  width: 2rem;
`;
