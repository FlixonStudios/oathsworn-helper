import { SettingsProvider } from "@/context-providers/settings/settings-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            title: "Game Probability Advisor (Alpha)",
          }}
        />
      </Stack>
    </SettingsProvider>
  );
}
