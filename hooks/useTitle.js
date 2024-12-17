import { useState } from "react";

export default function useTitle(defaultValue) {
  const [title, setTitle] = useState(defaultValue || "");

  return { title, setTitle };
}
