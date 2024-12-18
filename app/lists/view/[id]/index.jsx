import SaveOrCancel from "@/components/lists-components/SaveOrCancel";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import { useColorScheme } from "react-native";
import uuid from "react-native-uuid";
import ItemsForm from "@/components/lists-components/ItemsForm";
import TickedItemsForm from "@/components/lists-components/TickedItemsForm";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditList() {
  // Variables
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  let colorScheme = useColorScheme();

  // State
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [itemBoxes, setItemBoxes] = useState([]);
  const [tickedItemBoxes, setTickedItemBoxes] = useState([]);
  const [listToUpdate, setListToUpdate] = useState([]);

  const [created, setCreated] = useState("");
  const [edited, setEdited] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  // Refs
  const editScrollViewRef = useRef();

  // useEffect
  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerLeft: () => (
        <SaveOrCancel
          theme={colorScheme}
          handlePress={saveOrCancelAndNavigateHome}
        />
      ),
    });
  }, [id, itemBoxes]);

  // Handle Current Time and Edited state
  useEffect(() => {
    const currentDate = new Date();
    setCreated(currentDate.toLocaleString());

    setEdited(getCurrentTime());
  }, []);

  const fetchListFromLocalStorage = async () => {
    //await AsyncStorage.setItem("lists", "");
    try {
      const jsonValue = await AsyncStorage.getItem("lists");
      const storedLists = jsonValue != null ? JSON.parse(jsonValue) : null;

      // console.log(storedLists);
      if (storedLists) {
        storedLists.map((list) => {
          if (list["id"] == id) {
            setTitle(list.title);
            setItemBoxes(list["items"]);
            setListToUpdate(list);
            setTickedItemBoxes(list["tickedItems"]);
          }
        });
      } else {
        console.log("Something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateData = async (value) => {
    let storedLists = await AsyncStorage.getItem("lists");
    if (storedLists) {
      let lists = [];
      lists = JSON.parse(storedLists);
      console.log(typeof lists);

      lists.map((list, index) => {
        if (list["id"] == id) {
          console.log(list);
          list["createdAt"] = list["createdAt"];
          list["editedAt"] = edited;
          list["items"] = itemBoxes;
          list["title"] = title;
          list["tickedItems"] = tickedItemBoxes;
          list["length"] = itemBoxes.length;
        }
      });

      await AsyncStorage.setItem("lists", JSON.stringify(lists));
    } else {
      //await AsyncStorage.setItem("lists", JSON.stringify([value]));
    }
  };

  useEffect(() => {
    console.log("Page loaded, going to retrieve stored list with id ", id);
    fetchListFromLocalStorage();
  }, []);

  // Functions
  function saveOrCancelAndNavigateHome() {
    //console.log("Saving and Navigating to ListPage");

    const savedStatus = saveItems(itemBoxes, created, title);
    //console.log(savedStatus);

    router.push({
      pathname: "../",
      params: {
        isDeleted: false,
        deleteTime: "",
        listId: "",
        createTime: getCurrentTime(),
        savedStatus: savedStatus,
        from: "view",
      },
    });
  }

  function addItemBox() {
    const id = uuid.v4();

    const itemBox = {
      item: "",
      checked: false,
      id: id,
    };

    setItemBoxes((prev) => [...prev, itemBox]);
    setTimeout(
      () => editScrollViewRef.current?.scrollToEnd({ animated: true }),
      200
    );
  }

  function saveItems(itemBoxes, created, title) {
    //console.log("Saving...", itemBoxes);
    // console.log("List to update:", listToUpdate);
    // console.log(listToUpdate["items"].item);
    // console.log(itemBoxes == listToUpdate["items"]);
    if (itemBoxes) {
      let listObject = {
        items: itemBoxes,
        length: itemBoxes.length,
        title: title,
        id: id,
        createdAt: created,
        editedAt: created,
        tickedItems: tickedItemBoxes,
      };

      //console.log(listObject);

      updateData(listObject);

      return "Updated";
    }
    return "Not updated";
  }

  function markItemAsBought() {}

  function deleteItemBox(id, ticked) {
    if (!ticked) {
      console.log("Detleted", id);
      setItemBoxes((prev) => prev.filter((item) => item.id !== id)); // Remove item with the given id
    } else {
      console.log("Detleted Ticked", id);
      setTickedItemBoxes((prev) =>
        prev.filter((itemToDelete) => itemToDelete.id !== id)
      );
    }
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours(); // Add leading zero to hours
    const minutes =
      now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes(); // Add leading zero to minutes
    return `${hours}:${minutes}`;
  }

  function handleOnPress() {
    setModalVisible(true);
  }

  const deleteData = async () => {
    let storedLists = await AsyncStorage.getItem("lists");
    if (storedLists) {
      let lists = [];
      lists = JSON.parse(storedLists);

      const exludingDeletedItem = lists.filter(
        (listToDelete) => listToDelete["id"] !== id
      );

      await AsyncStorage.setItem("lists", JSON.stringify(exludingDeletedItem));
    } else {
      //await AsyncStorage.setItem("lists", JSON.stringify([value]));
    }
  };

  function deleteList() {
    setModalVisible(false);

    deleteData();

    //console.log("Going to Delete the List");
    router.push({
      pathname: "/lists",
      params: { isDeleted: true, deleteTime: getCurrentTime(), listId: id },
    });
  }

  return (
    <ItemsForm
      title={title}
      setTitle={setTitle}
      itemBoxes={itemBoxes}
      setItemBoxes={setItemBoxes}
      addItemBox={addItemBox}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      edited={edited}
      handleOnPress={handleOnPress}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      deleteList={deleteList}
      deleteItemBox={deleteItemBox}
      tickedItemBoxes={tickedItemBoxes}
      setTickedItemBoxes={setTickedItemBoxes}
    />
  );
}
