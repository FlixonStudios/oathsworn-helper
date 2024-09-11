import { GameProvider } from "@/context-providers/game/game-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // Provider has to wrap the stack
    <GameProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: true, title: "Oathsworn Helper (Alpha)" }}
        />
      </Stack>
    </GameProvider>
  );
}
