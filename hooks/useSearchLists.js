import { useEffect, useState } from "react";

export default function useSearchLists(lists, filteredLists, setFilteredLists) {
  const [searchValue, setSearchValue] = useState("");

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

  function searchLists(searchValue) {
    setSearchValue(searchValue); // Update the search value state
    const filtered = lists.filter((list) =>
      list.title.toUpperCase().includes(searchValue.toUpperCase())
    );
    setFilteredLists(filtered); // Update filteredLists
  }

  return { searchLists, searchValue, setSearchValue };
}
