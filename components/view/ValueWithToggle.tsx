import {
  ChangeValueButton,
  GlobalText,
  MiniSquareView,
  SpacedAroundSection,
} from "@/constants/styles";
import { AnimatedPressable } from "../pressable";
import { GestureResponderEvent } from "react-native";

interface Props {
  decreaseText: string;
  increaseText: string;
  value: string | number;
  onDecrease: ((event: GestureResponderEvent) => void) | null | undefined;
  onIncrease: ((event: GestureResponderEvent) => void) | null | undefined;
}

export function ValueWithToggle(props: Props) {
  const { decreaseText, increaseText, value, onDecrease, onIncrease } = props;
  return (
    <SpacedAroundSection>
      <AnimatedPressable Component={ChangeValueButton} onPress={onDecrease}>
        <GlobalText>{decreaseText}</GlobalText>
      </AnimatedPressable>
      <MiniSquareView>
        <GlobalText>{value}</GlobalText>
      </MiniSquareView>
      <AnimatedPressable Component={ChangeValueButton} onPress={onIncrease}>
        <GlobalText>{increaseText}</GlobalText>
      </AnimatedPressable>
    </SpacedAroundSection>
  );
}
