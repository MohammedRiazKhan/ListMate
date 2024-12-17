import { Platform, Pressable, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { View } from "react-native";

export default function SaveOrCancel({ handlePress, theme }) {
  return (
    <>
      {Platform.OS === "ios" ? (
        <Pressable className="w-14 h-14 justify-center " onPress={handlePress}>
          <FontAwesome6
            name="chevron-left"
            size={20}
            color={`${theme === "dark" ? "white" : "black"}`}
          />
        </Pressable>
      ) : (
        <Pressable className="w-14 h-14 justify-center " onPress={handlePress}>
          <FontAwesome6
            name="arrow-left"
            size={20}
            color={`${theme === "dark" ? "white" : "black"}`}
          />
        </Pressable>
      )}
    </>
  );
}
