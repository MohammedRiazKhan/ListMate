import { View, TextInput } from "react-native";
import React from "react";
import { Appearance, useColorScheme } from "react-native";

export default function ListTitleInput({ title, setTitle }) {
  // Variables
  let colorScheme = useColorScheme();
  return (
    <View className="h-14">
      <TextInput
        keyboardAppearance={colorScheme === "dark" ? "dark" : "light"}
        className={`w-[250px] h-[50px] text-2xl p-1 outline-none ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}
        placeholderTextColor={`${
          colorScheme === "dark" ? "gray" : "dark-gray"
        }`}
        placeholder="Title"
        onChangeText={(inputtedText) => setTitle(inputtedText)}
        autoFocus={title === " " ? false : true}
        value={title ? title : ""}
      />
    </View>
  );
}
