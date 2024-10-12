import { useSettings } from "@/context-providers/settings/settings-hook";
import { Module } from "@/context-providers/settings/types";
import { router, Stack, useFocusEffect, usePathname } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";

export default function MainLayout() {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const { settingsState } = useSettings();
  const { module } = settingsState;
  const thisPath = `/main`;
  
  useLayoutEffect(() => {
    setIsReady(true);
  }, []);
  // TODO: Set loading spinner

  // redirection has to be on the layout file
  // seems to wrap the corresponding pages like router
  // cannot be in ./index.tsx since once the Tab displays the
  // nested route, the code in /.index.tsx will not fire
  useFocusEffect(
    useCallback(() => {
      const pathToGo =
        module === Module.NONE ? thisPath : `${thisPath}/${module}`;

      if (isReady && pathname !== pathToGo) {
        router.replace(pathToGo as any);
      }

    }, [module])
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
