import React, { useState, useEffect, useCallback } from "react";
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";

export default function useFetchLists() {
  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);

  const fetchLists = useCallback(() => {
    fetch("http://192.168.18.26:6968/api/lists")
      .then((response) => response.json())
      .then((data) => {
        setLists(data);
        setFilteredLists(data); // Initialize filtered lists with all data
      })
      .catch((error) => console.error("Error fetching lists:", error));
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLists(); // Fetch the latest lists whenever the screen gains focus
    }, [fetchLists])
  );

  return { lists, setLists, fetchLists, filteredLists, setFilteredLists };
}
