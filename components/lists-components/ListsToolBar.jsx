import { View, Text, Pressable } from "react-native";
import React from "react";
import { Appearance, useColorScheme } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function ListsToolBar({ isEditing, edited, handleOnPress }) {
  // Variables
  let colorScheme = useColorScheme();
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 5,
        backgroundColor:
          colorScheme === "dark"
            ? Colors.backgroundDark
            : Colors.backgroundLight,
      }}
      className={`h-16 flex flex-row justify-between items-center px-4  ${
        colorScheme === "dark" ? "bg-black" : ""
      }`}
    >
      {isEditing ? (
        <View className="flex-1 justify-center items-center">
          <Text
            className={`ml-9 ${
              colorScheme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Edited {edited}
          </Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text
            className={`ml-9 ${
              colorScheme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {edited}
          </Text>
        </View>
      )}

      {/* Right-aligned View */}
      <Pressable onPress={handleOnPress}>
        <View className="mr-3 mt-4 w-10 h-10">
          <Text className="text-center">
            <Entypo
              name="dots-three-vertical"
              size={20}
              color={`${colorScheme === "dark" ? "white" : "black"}`}
            />
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
