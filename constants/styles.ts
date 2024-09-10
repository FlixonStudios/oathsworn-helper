import styled from "styled-components/native";

export const colorMap = ["#ffffff", "#e8eb34", "#eb4334", "#000000"];

// ===========================================================
// View
// ===========================================================

export const RowSection = styled.View`
  flex-direction: row;
`;

export const ColumnSection = styled.View`
  flex-direction: column;
`;

export const CenteredView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BorderedCentered = styled(CenteredView)`
  border-radius: 2px;
  border-color: #000000;
  border-width: 1px;
`;

export const ResultContainer = styled(BorderedCentered)`
  width: 48px;
  flex-wrap: wrap;
  margin: 2px;
`;
export const ResultValue = styled(CenteredView)`
  width: 48px;
`;

// ===========================================================
// Pressable
// ===========================================================

export const CenteredPressable =  styled.Pressable`
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