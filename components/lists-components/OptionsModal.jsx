import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import MenuOption from "./MenuOption";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

export default function OptionsModal({
  modalVisible,
  setModalVisible,
  deleteList,
  listId,
}) {
  // Variables
  let colorScheme = useColorScheme();

  // State
  const [menuOptions, setMenuOptions] = useState([
    { optionName: "Delete", icon: "trash" },
    { optionName: "Make a copy", icon: "copy" },
    { optionName: "Share", icon: "share-social" },
  ]);

  // Functions
  function handleMenuPress(menuOption) {
    if (menuOption === "Delete") {
      deleteList();
    } else if (menuOption === "Make a copy") {
      console.log("Making a copy of List");
    } else if (menuOption === "Share") {
      console.log("Sharing List");
    }
  }

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className={`w-screen h-[200px] border-solid border-gray-600 border-t-2`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 20,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor:
              colorScheme === "dark"
                ? Colors.backgroundDark
                : Colors.backgroundLight,
          }}
        >
          <View
            style={{
              height: "20%",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text></Text>
            <Pressable className="mt-2" onPress={() => setModalVisible(false)}>
              <MaterialIcons
                name="close"
                color={colorScheme === "dark" ? "white" : "black"}
                size={25}
              />
            </Pressable>
          </View>

          {menuOptions.map((item, index) => (
            <View key={index}>
              <MenuOption
                name={item.optionName}
                icon={item.icon}
                handleMenuPress={handleMenuPress}
              />
            </View>
          ))}
        </View>
      </Modal>
    </View>
  );
}
