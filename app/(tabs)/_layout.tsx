import { Font } from "@/components/text/text";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 72,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          title: "Game",
          tabBarLabelStyle: { fontFamily: Font.Regular },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calculator" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabelStyle: { fontFamily: Font.Regular },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
