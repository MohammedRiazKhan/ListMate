import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Appearance, useColorScheme } from "react-native";

export default function AddItemButton({ addItemBox }) {
  // Variables
  let colorScheme = useColorScheme();
  return (
    <View className=" h-12 flex justify-center items-center mt-1 mb-[20px] ml-4">
      <TouchableOpacity
        onPress={addItemBox}
        className="ml-[-10px] flex flex-row p-3 rounded active:bg-slate-400 w-screen items-center h-16 "
      >
        <View className="ml-2">
          <Ionicons
            name="add"
            size={20}
            color={`${colorScheme === "dark" ? "white" : "black"}`}
          />
        </View>
        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-black"
          } text-xl ml-1 font-semibold`}
        >
          List Item
        </Text>
      </TouchableOpacity>
    </View>
  );
}
