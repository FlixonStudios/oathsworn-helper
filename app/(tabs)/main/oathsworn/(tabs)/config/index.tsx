import { Font, Text } from "@/components/text/text";
import { BasicScrollView, CenteredView, Color } from "@/constants/styles";
import { useGame } from "@/context-providers/oathsworn/oathsworn-hook";
import { CalculationSpeed } from "@/context-providers/oathsworn/types";
import { useMemo } from "react";
import { ImageBackground, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import {
  commonRadioButtonStyles,
  LabelContainer,
  radioGroupStyles,
} from "./config.styles";

export default function ConfigPage() {
  const { gameState, setCalculationSpeed } = useGame();

  function onSelectCalculationSpeed(speed: string) {
    setCalculationSpeed(speed as CalculationSpeed);
  }

  // TODO: move radio to common component
  // TODO: fix issue where config is reset on push
  const modulesRadioButtons: RadioButtonProps[] = useMemo(() => {
    const buttons = Object.values(CalculationSpeed).map((speed) => {
      return {
        ...commonRadioButtonStyles,
        id: speed,
        label: (
          <LabelContainer>
            <Text.Body style={{ color: Color.WHITE, fontFamily: Font.Bold }}>
              {speed}
            </Text.Body>
          </LabelContainer>
        ),
        value: speed,
      };
    });
    return buttons;
  }, []);

  return (
    <BasicScrollView
      contentContainerStyle={{
        display: "flex",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("@/assets/images/oathsworn-bg.png")}
        imageStyle={{ resizeMode: "cover" }}
        style={{ flex: 1, width: "100%" }}
      >
        <CenteredView style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}>
          <View style={{ marginVertical: 32 }}>
            <Text.H3 style={{ color: Color.WHITE }}>
              Select Calculation Speed
            </Text.H3>
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
      </ImageBackground>
    </BasicScrollView>
  );
}
