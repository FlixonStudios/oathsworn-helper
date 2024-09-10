import styled from "styled-components/native";

export const colorMap = ["#ffffff", "#e8eb34", "#eb4334", "#000000"];

export const RowSection = styled.View`
  flex-direction: row;
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
