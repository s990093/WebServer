"use client";
import React, { useEffect } from "react";
import { useScrollPosition } from "./ScrollRestorationContext";

const ScrollRestoration: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const { getScrollPosition, saveScrollPosition } = useScrollPosition();

  // useEffect(() => {
  //   // Ensure this code runs only on the client side
  //   console.log("ok");
  //   if (typeof window !== "undefined") {
  //     // Check if there's a saved scroll position for the current path
  //     const savedScrollPosition = getScrollPosition(window.location.pathname);
  //     if (savedScrollPosition !== undefined) {
  //       window.scrollTo(0, savedScrollPosition);
  //     }

  //     // Save the current scroll position when the component unmounts
  //     return () => {
  //       saveScrollPosition(window.location.pathname, window.scrollY);
  //     };
  //   }
  // }, [saveScrollPosition]);

  return <div>{children}</div>;
};

export default ScrollRestoration;
