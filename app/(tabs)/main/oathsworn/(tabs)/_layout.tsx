import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: "Unofficial Oathsworn Might Advisor",
      }}
    >
      <Tabs.Screen
        name="skill-check"
        options={{
          title: "Skill Check",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="check" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="damage-advice"
        options={{
          title: "Damage",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bar-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="decks"
        options={{
          title: "Decks",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="database" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
