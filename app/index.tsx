import { useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
export default function LandingPage() {
  const router = useRouter();
  // to prevent navigating before router is ready
  const [isReady, setIsReady] = useState(false);

  // layout effect fires synchronously after DOM mutations
  useLayoutEffect(() => {
    setIsReady(true);
  }, []);

  useLayoutEffect(() => {
    if (isReady) {
      router.replace("/(tabs)/main");
    }
  }, [isReady]); // dependency is required

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
