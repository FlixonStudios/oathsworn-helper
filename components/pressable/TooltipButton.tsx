import { AnimatedPressable } from "@/components/pressable";
import { Color } from "@/constants/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GestureResponderEvent, View } from "react-native";
import styled from "styled-components/native";

interface Props {
  onPress: (event?: GestureResponderEvent, args?: any[]) => void;
}

export function TooltipButton({ onPress }: Props) {
  function handleOnPress(e?: GestureResponderEvent) {
    e?.stopPropagation();
    onPress();
  }
  return (
    <PressableArea onPress={handleOnPress}>
      <IconContainer>
        <FontAwesome size={16} name="question" color={Color.WHITE} />
      </IconContainer>
    </PressableArea>
  );
}

export const PressableArea = styled(AnimatedPressable)`
  align-items: center;
  justify-content: center;
  width: 28px;
  border-radius: 20px;
`;

export const IconContainer = styled.View`
  border-radius: 20px;
  border-color: #ffffff;
  border-width: 2px;
  padding-horizontal: 6px;
  padding-vertical: 3px;
`;
