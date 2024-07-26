// ScrollPositionContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface ScrollPositionContextProps {
  scrollPositions: { [key: string]: number };
  saveScrollPosition: (path: string, position: number) => void;
  getScrollPosition: (path: string) => number | undefined;
}

const ScrollPositionContext = createContext<
  ScrollPositionContextProps | undefined
>(undefined);

export const useScrollPosition = () => {
  const context = useContext(ScrollPositionContext);
  if (!context) {
    throw new Error(
      "useScrollPosition must be used within a ScrollPositionProvider"
    );
  }
  return context;
};

export const ScrollPositionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [scrollPositions, setScrollPositions] = useState<{
    [key: string]: number;
  }>({});

  const saveScrollPosition = useCallback((path: string, position: number) => {
    setScrollPositions((prev) => ({ ...prev, [path]: position }));
  }, []);

  const getScrollPosition = useCallback(
    (path: string) => {
      return scrollPositions[path];
    },
    [scrollPositions]
  );

  return (
    <ScrollPositionContext.Provider
      value={{
        scrollPositions,
        saveScrollPosition,
        getScrollPosition,
      }}
    >
      {children}
    </ScrollPositionContext.Provider>
  );
};
