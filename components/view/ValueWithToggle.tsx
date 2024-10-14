import { Text } from "@/components/text/text";
import {
  ChangeValueButton,
  MiniSquareView,
  SpacedAroundSection,
} from "@/constants/styles";
import { GestureResponderEvent } from "react-native";
import { AnimatedPressable } from "../pressable";

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
        <Text.Body>{decreaseText}</Text.Body>
      </AnimatedPressable>
      <MiniSquareView>
        <Text.Body>{value}</Text.Body>
      </MiniSquareView>
      <AnimatedPressable Component={ChangeValueButton} onPress={onIncrease}>
        <Text.Body>{increaseText}</Text.Body>
      </AnimatedPressable>
    </SpacedAroundSection>
  );
}
