import { GameProvider } from "@/context-providers/game/game-provider";
import { Stack } from "expo-router";

// Must have layout file, else Tab icon will not show when moved TabScreens into folders
export default function MainLayout() {
  // Must be Stack not Stack.Screen, else Tab icon will not show
  return (
    <GameProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GameProvider>
  );
}
