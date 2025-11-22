import { createContext, useState, useContext } from "react";

const TabContext = createContext();

export function TabProvider({ children }) {
  const [index, setIndex] = useState(0);

  function selectTabChats() {
    setIndex(0);
  }

  function selectTabAddChat() {
    setIndex(1);
  }

  function selectTabSettings() {
    setIndex(2);
  }

  return (
    <TabContext.Provider
      value={{
        index,
        setIndex,
        selectTabChats,
        selectTabAddChat,
        selectTabSettings,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  return useContext(TabContext);
}
