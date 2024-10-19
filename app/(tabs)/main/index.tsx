import { Font, FontPaths, Text } from "@/components/text/text";
import { ModuleCard } from "@/components/view/ModuleCard";
import { BasicScrollView, CenteredView } from "@/constants/styles";
import { useSettings } from "@/context-providers/settings/settings-hook";
import { Module } from "@/context-providers/settings/types";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { ModulesContainer } from "./main.styles";

SplashScreen.preventAutoHideAsync();

export default function MainPage() {
  const [loaded, error] = useFonts({
    [Font.Bold]: FontPaths.Bold,
    [Font.Italic]: FontPaths.Italic,
    [Font.Regular]: FontPaths.Regular,
  });
  const { setModule } = useSettings();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  function onSelectModule(moduleName: string) {
    setModule(moduleName as Module);
  }

  if (!loaded && !error) {
    return null;
  }
  return (
    <BasicScrollView>
      <CenteredView>
        <View style={{ marginVertical: 32 }}>
          <Text.H1>Welcome!</Text.H1>
        </View>
        <Text.Body>Please select a Module from below to get started</Text.Body>
        <ModulesContainer>
          {Object.values(Module)
            .filter((mod) => mod !== Module.NONE)
            .map((mod, i) => (
              <ModuleCard
                key={i}
                title={mod}
                onPress={() => onSelectModule(mod)}
              />
            ))}
        </ModulesContainer>
      </CenteredView>
    </BasicScrollView>
  );
}
