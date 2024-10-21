import { AnimatedPressable } from "@/components/pressable";
import { Color } from "@/constants/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GestureResponderEvent } from "react-native";
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
      <FontAwesome
        size={16}
        name="question"
        color={Color.WHITE}
        style={{
          borderColor: Color.WHITE,
          borderWidth: 2,
          borderRadius: 10,
          paddingHorizontal: 4,
        }}
      />
    </PressableArea>
  );
}

export const PressableArea = styled(AnimatedPressable)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
