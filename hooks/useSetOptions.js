import { router, useNavigation } from "expo-router";
import { React, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import useRedirect from "./useRedirect";
import SaveOrCancel from "@/components/lists-components/SaveOrCancel";
import useItemBoxes from "./useItemBoxes";
import useTime from "./useTime";

export default function useSetOptions(
  isUpdating,
  title,
  saveOrCancelAndNavigateHome
) {
  const navigation = useNavigation();
  let colorScheme = useColorScheme();

  // Set Header Options
  useEffect(() => {
    navigation.setOptions({
      title: isUpdating ? title : "New List",
      headerLeft: () => (
        <SaveOrCancel
          theme={colorScheme}
          handlePress={saveOrCancelAndNavigateHome}
        />
      ),
    });
  });

  return { colorScheme, navigation };
}
