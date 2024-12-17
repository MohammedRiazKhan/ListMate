import { useEffect, useState } from "react";

export default function useTime() {
  const [created, setCreated] = useState("");
  const [edited, setEdited] = useState("");

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours(); // Add leading zero to hours
    const minutes =
      now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes(); // Add leading zero to minutes
    return `${hours}:${minutes}`;
  }

  function getCurrentDate() {
    return new Date();
  }

  // Handle Current Time and Edited state
  useEffect(() => {
    const currentDate = getCurrentDate();
    setCreated(currentDate.toLocaleString());

    setEdited(getCurrentTime());
  }, []);

  return {
    getCurrentTime,
    getCurrentDate,
    created,
    setCreated,
    edited,
    setEdited,
  };
}
