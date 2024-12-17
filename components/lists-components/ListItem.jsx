import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function ListItem({ icon, title, count, theme }) {
  return (
    <View
      className={`flex-row items-center  p-4 mt-1 rounded w-full `}
      style={{
        backgroundColor:
          theme === "dark" ? Colors.primaryCardDark : Colors.primaryCardLight,
      }}
    >
      {/* Title on the left */}
      <Text
        className={`${
          theme === "dark" ? "text-white" : "text-black"
        } text-lg font-bold flex-1`}
      >
        {title}
      </Text>

      {/* Right-aligned count and icon */}
      <View className="flex-row items-center">
        {/* Count Container */}
        <View className="items-center mr-2 p-2 rounded">
          <Text
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } text-lg`}
          >
            {count}
          </Text>
        </View>
        {/* Icon Container */}
        <View className="items-center mt-1">
          <FontAwesome
            name={icon}
            size={20}
            color={`${theme === "dark" ? "white" : "black"}`}
          />
        </View>
      </View>
    </View>
  );
}
