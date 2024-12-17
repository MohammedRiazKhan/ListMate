import { View, Text } from "react-native";
import React from "react";

export default function Popup({ message }) {
  return (
    <View className="h-14 w-[90%] mb-2 bg-gray-600 ml-auto mr-auto flex-row items-center rounded-md shadow-slate-400">
      <Text className="text-white ml-4 flex-1">{message}</Text>
      {/* <Pressable onPress={undoDelete}>
      <Text className="text-white mr-4">UNDO</Text>
    </Pressable> */}
    </View>
  );
}
