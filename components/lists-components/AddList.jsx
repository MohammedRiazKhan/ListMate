import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function AddList({ onPress, theme }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-start p-3 rounded"
      accessibilityLabel="Add new list"
      activeOpacity={0.7}
    >
      <AntDesign
        name="plus"
        size={20}
        color={theme === "dark" ? Colors.light : Colors.dark}
        className="ml-4"
      />
      <Text
        className={`${
          theme === "dark" ? "text-white" : "text-black"
        }  ml-2 font-semibold text-xl`}
        style={{
          color: theme === "dark" ? Colors.light : Colors.dark,
        }}
      >
        Add List
      </Text>
    </TouchableOpacity>
  );
}
