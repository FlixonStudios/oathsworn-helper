import { Font, FontPaths, Text } from "@/components/text/text";
import { BasicScrollView, CenteredView } from "@/constants/styles";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function MainPage() {
  const [loaded, error] = useFonts({
    [Font.Bold]: FontPaths.Bold,
    [Font.Italic]: FontPaths.Italic,
    [Font.Regular]: FontPaths.Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <BasicScrollView>
      <CenteredView>
        <View style={{ marginVertical: 32 }}>
          <Text.Body>Welcome!</Text.Body>
        </View>
        <Text.Body>
          Please select a Module from Settings to get started
        </Text.Body>
      </CenteredView>
    </BasicScrollView>
  );
}
