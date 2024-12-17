import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import useTime from "./useTime";

export default function usePopup() {
  const { getCurrentTime } = useTime();
  const { isDeleted, deleteTime, listId, savedStatus, createTime, from } =
    useLocalSearchParams();

  const [deletePopupVisible, setDeletePopupVisisble] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [hasShownCreatedPopup, setHasShownCreatedPopup] = useState(false);

  const [createdPopupVisible, setCreatedPopupVisible] = useState();
  const [createdPopupMessage, setCreatedPopupMessage] = useState();

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

  return { deletePopupVisible, createdPopupVisible, createdPopupMessage };
}
