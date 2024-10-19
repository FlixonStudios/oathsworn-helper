import { Font } from "@/components/text/text";
import { OathswornProvider } from "@/context-providers/oathsworn/oathsworn-provider";
import { useSettings } from "@/context-providers/settings/settings-hook";
import { Module } from "@/context-providers/settings/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { setModule } = useSettings();
  return (
    // Provider must wrap Stack or Tabs to give it context
    <OathswornProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerTitle: "Unofficial Oathsworn Might Advisor",
          headerTitleStyle: { fontFamily: Font.Bold },
          tabBarStyle: {
            height: 72,
            paddingBottom: 8,
          },
          headerLeft: () => (
            <FontAwesome
              style={{ marginLeft: 16 }}
              size={28}
              name="chevron-left"
              onPress={() => setModule(Module.NONE)}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="skill-check"
          options={{
            title: "Skill Check",
            tabBarLabelStyle: { fontFamily: Font.Regular },
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="check" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="damage-advice"
          options={{
            title: "Damage",
            tabBarLabelStyle: { fontFamily: Font.Regular },
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="bar-chart" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="decks"
          options={{
            title: "Decks",
            tabBarLabelStyle: { fontFamily: Font.Regular },
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="database" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: "Config",
            tabBarLabelStyle: { fontFamily: Font.Regular },
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="wrench" color={color} />
            ),
          }}
        />
      </Tabs>
    </OathswornProvider>
  );
}
