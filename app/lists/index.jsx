import AddList from "@/components/lists-components/AddList";
import ListItem from "@/components/lists-components/ListItem";
import Popup from "@/components/lists-components/Popup";
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  RefreshControl,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usePopup from "@/hooks/usePopup";

export default function Lists() {
  // Hooks
  const { createdPopupVisible, deletePopupVisible, createdPopupMessage } =
    usePopup();

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

  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [hasShownCreatedPopup, setHasShownCreatedPopup] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // useEffects
  useFocusEffect(
    useCallback(() => {
      fetchListsFromLocalStorage(); // Fetch the latest lists whenever the screen gains focus
    }, [lists])
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

  //Every minute fetch lists from localstorage
  useEffect(() => {
    const interval = setInterval(() => {
      fetchListsFromLocalStorage();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Functions
  const handleAddListPress = () => {
    router.push("/lists/create");
  };

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
