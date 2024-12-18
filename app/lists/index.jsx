import AddList from "@/components/lists-components/AddList";
import ListItem from "@/components/lists-components/ListItem";
import Popup from "@/components/lists-components/Popup";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Lists() {
  // Variables
  let colorScheme = useColorScheme();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  const { isDeleted, deleteTime, listId, savedStatus, createTime, from } =
    useLocalSearchParams();

  // State
  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [deletePopupVisible, setDeletePopupVisisble] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [hasShownCreatedPopup, setHasShownCreatedPopup] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [createdPopupVisible, setCreatedPopupVisible] = useState();
  const [createdPopupMessage, setCreatedPopupMessage] = useState();

  // useEffects

  // Initial page mount, fetch Lists
  // useFocusEffect(
  //   useCallback(() => {
  //     const lists = fetchListsFromLocalStorage();
  //     console.log(lists);
  //     //fetchLists(); // Fetch the latest lists whenever the screen gains focus
  //   }, [fetchListsFromLocalStorage])
  // );

  useFocusEffect(
    useCallback(() => {
      fetchListsFromLocalStorage(); // Fetch the latest lists whenever the screen gains focus
    }, [lists])
  );

  // When list is deleted from either Create or View route, we display popup
  useFocusEffect(
    useCallback(() => {
      // console.log(deleteTime, getCurrentTime());
      // console.log(deleteTime == getCurrentTime());
      // console.log(listId);
      // console.log(savedStatus);
      if (isDeleted && deleteTime == getCurrentTime() && !hasShownPopup) {
        setDeletePopupVisisble(true);
        setTimeout(() => setDeletePopupVisisble(false), 5000);
        setHasShownPopup(true);
      }

      // console.log(savedStatus, typeof savedStatus);

      // console.log(
      //   savedStatus,
      //   createTime,
      //   getCurrentTime(),
      //   !hasShownCreatedPopup,
      //   from
      // );

      if (
        savedStatus === "Empty" &&
        createTime === getCurrentTime() &&
        !hasShownCreatedPopup &&
        from === "created"
      ) {
        //console.log("Show not saved popup");
        setCreatedPopupVisible(true);
        setTimeout(() => setCreatedPopupVisible(false), 5000);
        setHasShownCreatedPopup(true);
        setCreatedPopupMessage("Empty list not saved");
      } else if (
        savedStatus === "Saved" &&
        createTime === getCurrentTime() &&
        !hasShownCreatedPopup &&
        from === "created"
      ) {
        //console.log("Show saved popup");
        setCreatedPopupVisible(true);
        setTimeout(() => setCreatedPopupVisible(false), 5000);
        setHasShownCreatedPopup(true);
        setCreatedPopupMessage("List saved");
      } else if (
        savedStatus === "Updated" &&
        createTime === getCurrentTime() &&
        !hasShownCreatedPopup &&
        from == "view"
      ) {
        //console.log("Show updated popup");
        setCreatedPopupVisible(true);
        setTimeout(() => setCreatedPopupVisible(false), 5000);
        setHasShownCreatedPopup(true);
        setCreatedPopupMessage("List updated");
      }
    }, [])
  );

  // Maintain value of search
  useEffect(() => {
    if (searchValue === "") {
      setFilteredLists(lists);
    } else {
      const filtered = lists.filter((list) =>
        list.title.toUpperCase().includes(searchValue.toUpperCase())
      );
      setFilteredLists(filtered);
    }
  }, [lists, searchValue]);

  // Set search bar options
  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search notes",
        hideWhenScrolling: true,
        headerIconColor: "white",
        textColor: colorScheme === "dark" ? "white" : "black",
        //hintTextColor: "white",
        //headerIconColor: "white",
        shouldShowHintSearchIcon: true,
        autoCapitalize: "words",
        headerTitleStyle: { color: "white" },
        onChangeText: (e) => searchLists(e.nativeEvent.text),
      },
    });
  }, [navigation]);

  // Every minute fetch lists from backend
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchLists();
  //   }, 60000);

  //   return () => clearInterval(interval);
  // }, []);

  // Functions
  const handleAddListPress = () => {
    router.push("/lists/create");
  };

  // Fetch lists from API
  const fetchLists = useCallback(() => {
    fetch("http://192.168.18.26:6968/api/lists")
      .then((response) => response.json())
      .then((data) => {
        setLists(data);
        setFilteredLists(data); // Initialize filtered lists with all data
      })
      .catch((error) => console.error("Error fetching lists:", error));
  }, []);

  const fetchListsFromLocalStorage = async () => {
    //await AsyncStorage.setItem("lists", "");
    try {
      const jsonValue = await AsyncStorage.getItem("lists");
      const storedLists = jsonValue != null ? JSON.parse(jsonValue) : null;

      // console.log(storedLists);
      if (storedLists) {
        setLists(storedLists);
        setFilteredLists(storedLists);
      } else {
        setLists([]);
        setFilteredLists([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Search lists
  function searchLists(searchValue) {
    setSearchValue(searchValue); // Update the search value state
    const filtered = lists.filter((list) =>
      list.title.toUpperCase().includes(searchValue.toUpperCase())
    );
    setFilteredLists(filtered); // Update filteredLists
  }

  function undoDelete() {
    console.log("Undoing Delete for list ", listId);
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours(); // Add leading zero to hours
    const minutes =
      now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes(); // Add leading zero to minutes
    return `${hours}:${minutes}`;
  }

  // Handle refresh function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchListsFromLocalStorage();
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className={`container h-screen flex-1 `}
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? Colors.backgroundDark
            : Colors.backgroundLight,
        //paddingTop: Platform.OS === "ios" ? headerHeight : 0,
      }}
    >
      {filteredLists.length > 0 ? (
        <ScrollView
          className={"ml-5 mr-5 "}
          // style={{ paddingTop: Platform.OS === "ios" ? headerHeight : 0 }}
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingTop: Platform.OS === "ios" ? 10 : 0,
          }}
        >
          {filteredLists.map((list) => (
            <Link key={list["id"]} href={`/lists/view/${list.id}`} className="">
              <ListItem
                theme={colorScheme}
                title={list["title"]}
                count={list["length"]}
                icon={"chevron-right"}
              />
            </Link>
          ))}
        </ScrollView>
      ) : (
        <ScrollView className={"mt-10 ml-5 mr-5 "}>
          {lists.map((list) => (
            <Link key={list["id"]} href={`/lists/view/${list.id}`} className="">
              <ListItem
                theme={colorScheme}
                title={list["title"]}
                count={list["length"]}
                icon={"chevron-right"}
              />
            </Link>
          ))}
        </ScrollView>
      )}

      {deletePopupVisible && <Popup message={"List deleted"} />}

      {createdPopupVisible && <Popup message={createdPopupMessage} />}

      <View className="mr-4 w-screen">
        <AddList theme={colorScheme} onPress={handleAddListPress} />
      </View>

      <StatusBar style={`${colorScheme === "dark" ? "light" : "dark"}`} />
    </SafeAreaView>
  );
}
