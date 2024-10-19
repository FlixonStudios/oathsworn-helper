import { Text } from "@/components/text/text";
import { BasicScrollView, CenteredView } from "@/constants/styles";
import { useMemo } from "react";
import { View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import {
  commonRadioButtonStyles,
  LabelContainer,
  radioGroupStyles,
} from "./config.styles";
import { useGame } from "@/context-providers/oathsworn/oathsworn-hook";
import { CalculationSpeed } from "@/context-providers/oathsworn/types";

export default function ConfigPage() {
  const { gameState, setCalculationSpeed } = useGame();

  function onSelectCalculationSpeed(speed: string) {
    setCalculationSpeed(speed as CalculationSpeed);
  }

  // TODO: move radio to common component
  const modulesRadioButtons: RadioButtonProps[] = useMemo(() => {
    const buttons = Object.values(CalculationSpeed).map((speed) => {
      return {
        ...commonRadioButtonStyles,
        id: speed,
        label: (
          <LabelContainer>
            <Text.Body>{speed}</Text.Body>
          </LabelContainer>
        ),
        value: speed,
      };
    });
    return buttons;
  }, []);

  return (
    <BasicScrollView>
      <CenteredView>
        <View style={{ marginVertical: 32 }}>
          <Text.Body>Select Calculation Speed</Text.Body>
        </View>
        <View>
          <RadioGroup
            radioButtons={modulesRadioButtons}
            onPress={onSelectCalculationSpeed}
            selectedId={gameState.config.calculationSpeed}
            containerStyle={radioGroupStyles}
          />
        </View>
      </CenteredView>
    </BasicScrollView>
  );
}
