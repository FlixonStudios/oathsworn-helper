import { BorderedPressable, ColumnSection, RowSection } from "@/constants/styles";
import styled from "styled-components/native";

//==============================================================
// View
//==============================================================

export const SkillCheckSection = styled.View`
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const SkillCheckContent = styled(ColumnSection)``;

export const MightSection = styled(RowSection)`
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: space-around;
`;

//==============================================================
// Pressable
//==============================================================

export const CalculateButton = styled(BorderedPressable)`
  height: 32px;
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 16px;
`;

export const SeekButton = styled(BorderedPressable)`
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 32px;
  width: 32px;
`;
