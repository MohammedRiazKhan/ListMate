import { useFocusEffect } from "expo-router";
import { useState, useRef, useEffect, useCallback } from "react";
import uuid from "react-native-uuid";

export default function useItemBoxes(id) {
  const [itemBoxes, setItemBoxes] = useState([]);
  const [tickedItemBoxes, setTickedItemBoxes] = useState([]);
  const [itemBoxesCopy, setItemBoxesCopy] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  // Refs
  const scrollViewRef = useRef();

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

      fetch("http://192.168.18.26:6968/api/lists/new", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(listObject),
      })
        .then((response) => {
          response.json();
        })
        .catch((error) => {
          console.log(error);
        });

      return "Saved";
    }
    return "Empty";
  }

  function updateSavedItems(itemBoxes, created, title) {
    //console.log("Saving...", itemBoxes);
    // console.log("List to update:", listToUpdate);
    // console.log(listToUpdate["items"].item);

    // console.log(itemBoxes === listToUpdate["items"]);
    // console.log(listToUpdate);

    console.log(itemBoxesCopy);
    console.log(itemBoxes === itemBoxesCopy);

    if (itemBoxes != itemBoxesCopy) {
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

      fetch(`http://192.168.18.26:6968/api/lists/update/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(listObject),
      })
        .then((response) => {
          response.json();
        })
        .catch((error) => {
          console.log(error);
        });
      return "Updated";
    }
    return "Not updated";
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

  return {
    itemBoxes,
    setItemBoxes,
    scrollViewRef,
    addItemBox,
    isEditing,
    setIsEditing,
    tickedItemBoxes,
    setTickedItemBoxes,
    deleteItemBox,
    markItemAsBought,
    saveItems,
    updateSavedItems,
  };
}
