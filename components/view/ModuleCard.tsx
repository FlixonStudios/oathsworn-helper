import styled from "styled-components/native";
import { Text } from "../text/text";
import { BorderedCentered } from "@/constants/styles";
import { AnimatedPressable } from "../pressable";

interface Props {
  title: string;
  onPress: () => void;
}

export function ModuleCard({ title, onPress }: Props) {
  return (
    <CustomPressable onPress={onPress}>
      <Container>
        <Text.H1 style={{ color: "white" }}>{title}</Text.H1>
      </Container>
    </CustomPressable>
  );
}

export const CustomPressable = styled(AnimatedPressable)`
  margin: 16px;
`;

export const Container = styled(BorderedCentered)`
  display: flex;
  border-radius: 8px;
  border-color: white;
  padding: 32px 16px;
`;

export const ModuleName = styled(Text.H1)``;
