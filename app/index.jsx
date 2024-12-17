import React, { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Theme from "@/constants/Colors";

export default function Home() {
  useEffect(() => {
    setTimeout(() => router.replace("/lists"), 1);
  });

  return <></>;
}
