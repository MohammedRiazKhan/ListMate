import AddItemButton from "@/components/lists-components/AddItemButton";
import ItemBox from "@/components/lists-components/ItemBox";
import ListsToolBar from "@/components/lists-components/ListsToolBar";
import ListTitleInput from "@/components/lists-components/ListTitleInput";
import { useNavigation } from "expo-router";
import { React } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";

import OptionsModal from "@/components/lists-components/OptionsModal";
import Colors from "@/constants/Colors";
import TickedItemsForm from "./TickedItemsForm";

export default function ItemsForm({
  title,
  scrollViewRef,
  setTitle,
  itemBoxes,
  addItemBox,
  isEditing,
  edited,
  handleOnPress,
  modalVisible,
  setModalVisible,
  deleteList,
  setItemBoxes,
  setIsEditing,
  deleteItemBox,
  tickedItemBoxes,
  setTickedItemBoxes,
}) {
  //Variables
  const navigation = useNavigation();

  let colorScheme = useColorScheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" for iOS, "height" for Android
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? Colors.backgroundDark
            : Colors.backgroundLight,
        flex: 1,
      }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      className={`mb-0 ${colorScheme === "dark" ? "bg-black" : ""}`}
    >
      <SafeAreaView
        className={`mb-0 ${
          colorScheme === "dark" ? "bg-black" : ""
        } container flex-1 `}
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? Colors.backgroundDark
              : Colors.backgroundLight,
          flex: 1,
        }}
      >
        <View className="flex-1">
          <ScrollView
            keyboardShouldPersistTaps={"always"}
            contentInsetAdjustmentBehavior="automatic"
            ref={scrollViewRef}
            className={`flex-1 p-4 mb-12`}
          >
            <ListTitleInput title={title} setTitle={setTitle} />
            {itemBoxes.map((item, index) => (
              <ItemBox
                key={item.id}
                item={item}
                itemBoxes={itemBoxes}
                setItemBoxes={setItemBoxes}
                addItemBox={addItemBox}
                deleteItemBox={deleteItemBox}
                tickedItemBoxes={tickedItemBoxes}
                setTickedItemBoxes={setTickedItemBoxes}
              />
            ))}

            <AddItemButton addItemBox={addItemBox} />

            {tickedItemBoxes.length > 0 && (
              <TickedItemsForm
                itemBoxes={itemBoxes}
                setItemBoxes={setItemBoxes}
                tickedItemBoxes={tickedItemBoxes}
                setTickedItemBoxes={setTickedItemBoxes}
                deleteItemBox={deleteItemBox}
              />
            )}
          </ScrollView>
        </View>

        <ListsToolBar
          isEditing={isEditing}
          edited={edited}
          handleOnPress={handleOnPress}
        />

        <OptionsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          deleteList={deleteList}
          id={1}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
