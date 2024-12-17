import React, { useState, useEffect, useCallback } from "react";
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";

export default function useFetchSingleList(
  title,
  setTitle,
  itemBoxes,
  setItemBoxes,
  tickedItemBoxes,
  setTickedItemBoxes,
  id
) {
  const [listToUpdate, setListToUpdate] = useState([]);

  const fetchSingleListById = useCallback(() => {
    fetch(`http://192.168.18.26:6968/api/lists/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("Fetched List: ", data);
        setTitle(data.title);
        setItemBoxes(data["items"]);
        setListToUpdate(data);
        setTickedItemBoxes(data["tickedItems"]);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSingleListById();
    }, [fetchSingleListById])
  );

  return { listToUpdate, itemBoxes, tickedItemBoxes };
}
