import SaveOrCancel from "@/components/lists-components/SaveOrCancel";
import { router, useNavigation } from "expo-router";
import { React, useEffect, useRef, useState } from "react";
import { useColorScheme } from "react-native";
import uuid from "react-native-uuid";

import ItemsForm from "@/components/lists-components/ItemsForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  //Variables
  const navigation = useNavigation();

  let colorScheme = useColorScheme();

  // State
  const [title, setTitle] = useState("");
  const [itemBoxes, setItemBoxes] = useState([]);
  const [tickedItemBoxes, setTickedItemBoxes] = useState([
    // { checked: true, id: "6b029a29-60bc-4997-8f5c-846d2a44b4ca", item: "Test" },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const [created, setCreated] = useState("");
  const [edited, setEdited] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  // Refs
  const scrollViewRef = useRef();

  // useEffects
  // Set Header Options
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <SaveOrCancel
          theme={colorScheme}
          handlePress={saveOrCancelAndNavigateHome}
        />
      ),
    });
  });

  // Handle Current Time and Edited state
  useEffect(() => {
    const currentDate = new Date();
    setCreated(currentDate.toLocaleString());

    setEdited(getCurrentTime());
  }, []);

  // Functions
  function saveOrCancelAndNavigateHome() {
    //console.log("Saving and Navigating to ListPage");
    const savedStatus = saveItems(itemBoxes, created, title);
    //console.log(savedStatus);
    router.push({
      pathname: "/lists",
      params: {
        isDeleted: false,
        deleteTime: "",
        listId: "",
        createTime: getCurrentTime(),
        savedStatus: savedStatus,
        from: "created",
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
      () => scrollViewRef.current?.scrollToEnd({ animated: true }),
      200
    );
  }

  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);

  //     const storedLists = await AsyncStorage.getItem("lists");
  //     const storedListsArray = [JSON.parse(storedLists)];

  //     if (storedLists !== null) {
  //       storedListsArray.push(JSON.parse(jsonValue));
  //       console.log(storedListsArray);

  //       await AsyncStorage.setItem("lists", JSON.stringify(storedListsArray));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const storeData = async (value) => {
    let storedLists = await AsyncStorage.getItem("lists");
    if (storedLists) {
      let lists = [];
      lists = JSON.parse(storedLists);
      lists.push(value);
      await AsyncStorage.setItem("lists", JSON.stringify(lists));
    } else {
      await AsyncStorage.setItem("lists", JSON.stringify([value]));
    }

    // if (storedLists) {
    //   lists = storedLists;
    //   lists.push(value);
    //   console.log(lists);
    // } else {
    //   await AsyncStorage.setItem("lists", JSON.stringify(value));
    // }

    //await AsyncStorage.setItem("lists", JSON.stringify(lists));
  };

  function saveItems(itemBoxes, created, title) {
    if (title && itemBoxes.length > 0) {
      let listObject = {
        items: itemBoxes,
        length: itemBoxes.length,
        title: title,
        id: uuid.v4(),
        createdAt: created,
        editedAt: created,
        tickedItems: tickedItemBoxes,
      };

      storeData(listObject);

      // fetch("http://192.168.18.26:6968/api/lists/new", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(listObject),
      // })
      //   .then((response) => {
      //     response.json();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      return "Saved";
    }
    return "Empty";
  }

  function markItemAsBought() {}

  function deleteItemBox(id, ticked) {
    if (!ticked) {
      setItemBoxes((prev) => prev.filter((item) => item.id !== id)); // Remove item with the given id
    } else {
      setTickedItemBoxes((prev) =>
        prev.filter((itemToDelete) => item.id !== itemToDelete.id)
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

  function deleteList() {
    setModalVisible(false);

    // fetch(`http://192.168.18.26:6968/api/lists/delete/${id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   // body: JSON.stringify({"Delete"}),
    // })
    //   .then((response) => {
    //     response.json();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //console.log("Going to Delete the List");
    router.push({
      pathname: "/lists",
      params: { isDeleted: true, deleteTime: getCurrentTime(), listId: 1 },
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
