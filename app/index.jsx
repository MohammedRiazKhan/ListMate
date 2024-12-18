import React, { useEffect } from "react";
import { router } from "expo-router";

export default function Home() {
  useEffect(() => {
    setTimeout(() => router.replace("/lists"), 1);
  });

  return <></>;
}
