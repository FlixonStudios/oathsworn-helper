import { Font, Text } from "@/components/text/text";
import { Color } from "@/constants/styles";
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
            backgroundColor: Color.LESS_DARK_BLUE,
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
            tabBarLabel: ({ focused }) => {
              return (
                <Text.BodySmall
                  style={{ color: focused ? Color.WHITE : Color.GREY }}
                >
                  Skill Check
                </Text.BodySmall>
              );
            },
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                size={28}
                name="check"
                color={focused ? "white" : color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="damage-advice"
          options={{
            title: "Damage",
            tabBarLabel: ({ focused }) => {
              return (
                <Text.BodySmall
                  style={{ color: focused ? Color.WHITE : Color.GREY }}
                >
                  Damage
                </Text.BodySmall>
              );
            },
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                size={28}
                name="bar-chart"
                color={focused ? "white" : color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="decks"
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text.BodySmall
                  style={{ color: focused ? Color.WHITE : Color.GREY }}
                >
                  Decks
                </Text.BodySmall>
              );
            },
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                size={28}
                name="database"
                color={focused ? "white" : color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text.BodySmall
                  style={{ color: focused ? Color.WHITE : Color.GREY }}
                >
                  Config
                </Text.BodySmall>
              );
            },
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                size={28}
                name="wrench"
                color={focused ? "white" : color}
              />
            ),
          }}
        />
      </Tabs>
    </OathswornProvider>
  );
}
