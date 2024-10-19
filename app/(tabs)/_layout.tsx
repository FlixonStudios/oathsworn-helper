import { Text } from "@/components/text/text";
import { Color } from "@/constants/styles";
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
          borderTopWidth: 2,
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text.BodySmall
                style={{ color: focused ? Color.WHITE : Color.GREY }}
              >
                Game
              </Text.BodySmall>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="calculator"
              color={focused ? "white" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text.BodySmall
                style={{ color: focused ? Color.WHITE : Color.GREY }}
              >
                Settings
              </Text.BodySmall>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="gear"
              color={focused ? "white" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
