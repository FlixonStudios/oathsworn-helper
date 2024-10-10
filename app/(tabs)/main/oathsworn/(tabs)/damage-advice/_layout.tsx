import { Stack } from "expo-router";

// Must have layout file, else Tab icon will not show when moved TabScreens into folders
export default function DamageAdviceLayout() {
    // Must be Stack not Stack.Screen, else Tab icon will not show
    return <Stack screenOptions={{ headerShown: false }} />;
  }