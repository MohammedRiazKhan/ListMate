import { router } from "expo-router";
import useTime from "./useTime";

export default function useRedirect(
  path,
  itemBoxes,
  saveItems,
  isUpdating,
  updateSavedItems,
  created,
  title
) {
  const redirect = () => {
    router.push(path);
  };

  const { getCurrentTime } = useTime();

  function saveOrCancelAndNavigateHome() {
    //console.log("Saving and Navigating to ListPage");

    //console.log(isUpdating);

    if (!isUpdating) {
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
    } else {
      const savedStatus = updateSavedItems(itemBoxes, created, title);
      //console.log(savedStatus);

      router.push({
        pathname: "/lists",
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
  }

  return {
    redirect,
    saveOrCancelAndNavigateHome,
  };
}
