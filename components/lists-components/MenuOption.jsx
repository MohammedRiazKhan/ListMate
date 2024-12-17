import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export default function MenuOption({ name, icon, handleMenuPress }) {
  // Variables
  let theme = useColorScheme();

  return (
    <Pressable className="h-10 mt-4" onPress={() => handleMenuPress(name)}>
      <View className="flex-row items-center justify-left p-1">
        <Ionicons
          className="ml-2 mr-4 "
          name={icon}
          color={theme === "dark" ? "white" : "black"}
          size={25}
        />
        <Text
          className={`text-xl ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
}
