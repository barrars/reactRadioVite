import React, { createContext, useState, useContext } from 'react';

// Create a context
const RoomTabsContext = createContext();

// Create a custom hook for easier usage of the context
export const useRoomTabs = () => useContext(RoomTabsContext);

// Create a provider component
export const RoomTabsProvider = ({ children }) => {
  const [roomTabs, setRoomTabs] = useState([]);

  // The value that will be supplied to any descendants of this provider
  const value = {
    roomTabs,
    setRoomTabs,
  };

  return (
    <RoomTabsContext.Provider value={value}>
      {children}
    </RoomTabsContext.Provider>
  );
};
