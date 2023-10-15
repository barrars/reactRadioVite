import React, { useState, createContext, useEffect, useContext } from 'react'
const OnlineStatusContext = createContext(true)

export default function OnlineStatusProvider ({ children }) {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine)
  // console.info('onlineStatus', onlineStatus)
  useEffect(() => {
    window.addEventListener('online', () => setOnlineStatus(true))
    window.addEventListener('offline', () => setOnlineStatus(false))

    return () => {
      window.removeEventListener('online', () => setOnlineStatus(true))
      window.removeEventListener('offline', () => setOnlineStatus(false))
    }
  })

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>)
}

export function useOnlineStatus () {
  return useContext(OnlineStatusContext)
}
