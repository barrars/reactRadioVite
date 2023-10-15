import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import useLocalStorage from './useLocalStorage'
let socketInstance
// get'socketId' from localStorage with hook useLocalStorage
const useSocket = (url = import.meta.env.VITE_REACT_APP_SOCKET) => {
  const [socketId, setSocketId] = useLocalStorage('socketId', null)
  const [socket, setSocket] = useState(null)
  // console.log({ socketId })
  if (socketId === null) {
    // generate uuid
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-mixed-operators
      const r = (Math.random() * 16) | 0
      // eslint-disable-next-line no-mixed-operators, eqeqeq
      const v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    }, [])
    setSocketId(uuid)
  }

  useEffect(() => {
    // If the socket instance is not available, create one
    if (!socketInstance) {
      socketInstance = io(url, {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: Infinity,
        autoConnect: false,
        query: {
          socketId
        }
      })
    }

    setSocket(socketInstance)

    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
        socketInstance = null
      }
    }
  }, [url, socketId])

  return socket
}

export default useSocket
