import { BasicScrollView, CenteredView } from "@/constants/styles";
import { useSettings } from "@/context-providers/settings/settings-hook";
import { Module } from "@/context-providers/settings/types";
import { useMemo } from "react";
import { Text, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { commonRadioButtonStyles, radioGroupStyles } from "./settings.styles";

export default function SettingsPage() {
  const { settingsState, setModule } = useSettings();
  const { module } = settingsState;

  function onSelectModule(moduleName: string) {
    setModule(moduleName as Module);
  }

  const modulesRadioButtons: RadioButtonProps[] = useMemo(() => {
    const buttons = Object.values(Module).map((mod) => {
      return {
        ...commonRadioButtonStyles,
        id: mod,
        label: mod,
        value: mod,
      };
    });
    return buttons;
  }, []);

  return (
    <BasicScrollView>
      <CenteredView>
        <View style={{ marginVertical: 32 }}>
          <Text>Select Module</Text>
        </View>
        <View>
          <RadioGroup
            radioButtons={modulesRadioButtons}
            onPress={onSelectModule}
            selectedId={module}
            containerStyle={radioGroupStyles}
          />
        </View>
      </CenteredView>
    </BasicScrollView>
  );
}