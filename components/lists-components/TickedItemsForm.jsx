import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { ScrollView } from "react-native";
import TickedItemBox from "@/components/lists-components/TickedItemBox";
import ItemBox from "./ItemBox";

export default function TickedItemsForm({
  tickedItemBoxes,
  setTickedItemBoxes,
  itemBoxes,
  setItemBoxes,
  deleteItemBox,
}) {
  //Variables
  const navigation = useNavigation();

  let colorScheme = useColorScheme();

  // State
  const [isExpanded, setIsExpanded] = useState(true);

  // Functions
  function toggleCollapsibleView() {
    isExpanded ? setIsExpanded(false) : setIsExpanded(true);
    //console.log(isExpanded);
  }

  return (
    <View className=" mb-[70px] border-t-[0.5px] border-white">
      <View className=" h-12 flex justify-center items-center mt-1 mb-[0px] ml-4">
        <TouchableOpacity
          onPress={toggleCollapsibleView}
          className="ml-[-10px] flex flex-row p-3 rounded active:bg-slate-400 w-screen items-center h-16 "
        >
          <View className="ml-2">
            {isExpanded ? (
              <Entypo
                name="chevron-down"
                size={20}
                color={`${colorScheme === "dark" ? "white" : "black"}`}
              />
            ) : (
              <Entypo
                name="chevron-up"
                size={20}
                color={`${colorScheme === "dark" ? "white" : "black"}`}
              />
            )}
          </View>
          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-black"
            } text-xl ml-1 font-semibold`}
          >
            {tickedItemBoxes.length} ticked item
          </Text>
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          contentInsetAdjustmentBehavior="automatic"
        >
          {tickedItemBoxes.map((item, index) => (
            <TickedItemBox
              key={item.id}
              item={item}
              itemBoxes={itemBoxes}
              setItemBoxes={setItemBoxes}
              tickedItemBoxes={tickedItemBoxes}
              setTickedItemBoxes={setTickedItemBoxes}
              deleteItemBox={deleteItemBox}
              expanded={isExpanded}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
