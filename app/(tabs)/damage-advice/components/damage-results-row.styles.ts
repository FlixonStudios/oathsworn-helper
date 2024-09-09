import { BorderedCentered } from "@/constants/styles";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

export const EmpowerValueContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 64px;
  margin: 2px;
`;

export const EmpowerValueView = styled(BorderedCentered)`
  height: 32px;
  width: 32px;
`;
