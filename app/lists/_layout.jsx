import Theme from "@/constants/Colors";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import "@/global.css";
import Colors from "@/constants/Colors";

export default function ListLayout() {
  let colorScheme = useColorScheme();
  return (
    <>
      <Stack
        screenOptions={{ headerTitleAlign: "center", animation: "default" }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "My Lists",
            headerLeft: () => <></>,
            headerStyle: {
              backgroundColor:
                colorScheme === "dark"
                  ? Theme.backgroundDark
                  : Theme.backgroundLight,
            },
            headerTitleStyle: {
              color: colorScheme === "dark" ? Theme.light : Theme.dark,
            },
            headerLargeTitle: false,
            headerLargeShadowVisible: false,
            // headerTransparent: true,
            // headerBlurEffect: "regular",
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="create/index"
          options={{
            title: "New List",
            // headerLeft: () => <SaveOrCancel />,
            // headerRight: () => <Save />,
            headerShown: true,
            // presentation: "modal",
            // gestureEnabled: false,
            headerStyle: {
              backgroundColor:
                colorScheme === "dark"
                  ? Theme.backgroundDark
                  : Theme.backgroundLight,
            },
            headerTitleStyle: {
              color: colorScheme === "dark" ? Theme.light : Theme.dark,
            },
            headerLeft: () => <></>,
            backgroundColor: "black",
          }}
        />
        <Stack.Screen
          name="view/[id]/index"
          options={{
            title: "",
            headerStyle: {
              backgroundColor:
                colorScheme === "dark"
                  ? Theme.backgroundDark
                  : Theme.backgroundLight,
            },
            headerTitleStyle: {
              color: colorScheme === "dark" ? Theme.light : Theme.dark,
            },
            headerLeft: () => <></>,
          }}
        />
      </Stack>
    </>
  );
}
