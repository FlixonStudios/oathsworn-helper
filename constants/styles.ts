import styled from "styled-components/native";

export const colorMap = ["#ffffff", "#e8eb34", "#eb4334", "#000000"];

export enum Color {
  GREY = "rgba(142, 142, 143, 1)",
  WHITE = "rgba(255,255,255,1)",
  SALMON = "rgba(255,104,93,1)",
  DARK_BLUE = "rgba(37,41,46,1)",
  LESS_DARK_BLUE = "rgba(50,65,84,1)",
}

// ===========================================================
// View
// ===========================================================

export const BasicScrollView = styled.ScrollView`
  display: flex;
`;

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

export const CenteredRowSection = styled(CenteredView)`
  flex-direction: row;
`;

export const BorderedCentered = styled(CenteredView)`
  border-radius: 2px;
  border-color: #000000;
  border-width: 1px;
`;

export const ModalStyledView = styled(BorderedCentered)`
  border-radius: 5px;
`;

export const ModalStyledSection = styled(CenteredView)`
  margin-bottom: 16px;
`;

export const ResultContainer = styled(BorderedCentered)`
  width: 48px;
  flex-wrap: wrap;
  margin: 2px;
  border-color: #ffffff;
`;
export const ResultValue = styled(CenteredView)`
  width: 48px;
`;

export const SpacedAroundSection = styled(RowSection)`
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: space-around;
`;

export const SpacedRowSection = styled(RowSection)`
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: space-between;
`;

export const MiniSquareView = styled(BorderedCentered)`
  height: 32px;
  width: 32px;
  background-color: #ffffff;
`;

// ===========================================================
// Pressable
// ===========================================================

export const CenteredPressable = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

export const BorderedPressable = styled(CenteredPressable)`
  border-radius: 2px;
  border-color: #000000;
  border-width: 1px;
`;

export const ChangeValueButton = styled(BorderedPressable)`
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
