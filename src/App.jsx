import { useEffect, useRef, useState } from 'react'
import Main from './components/Main'
import { inputName } from './helpers/methods'
import useSocket from './hooks/useSocket'
import useLocalStorage from './hooks/useLocalStorage'
import { useRoomTabs } from './context/RoomtabsContext'

const App = () => {
  const [localStorageRoomsArr, setlocalStorageRoomsArr] = useLocalStorage('rooms', ['main'])
  const { roomTabs, setRoomTabs } = useRoomTabs();
  const [username, setUsername] = useLocalStorage('username', null)
  // eslint-disable-next-line no-unused-vars
  const [socketConnection, setSocketConnection] = useState('false')
  // eslint-disable-next-line no-unused-vars
  const [socketId, setSocketId] = useState('')
  const inputEl = useRef(null)
  const socket = useSocket()
  inputEl?.current?.focus()
  useEffect(() => {
    if (!username) return
    // open socket connection
    socket?.connect()
    console.log(`username is ${username}`)
    if (!socket) return

    socket?.on('connect', () => {
      console.log('connected')
      console.log(`socket id ${socket.id}`)
      setSocketId(socket.id)
      setSocketConnection('true')
    })
    // if nav at / root navigate to /main
    if (window.location.pathname === '/') {
      window.location.pathname = '/main'
    }
    socket.username = username

    // Map over the rooms and for each room, return a promise
    const promises = localStorageRoomsArr.map((room, i) => {
      return new Promise((resolve) => {
        socket.emit('join', '1111', room, (r, c) => {
          console.log(r, c)
          console.log(`joined room ${r} from localstorage, count is ${c}`)
          roomTabs[i] = { room: r, users: c }
          resolve() // Resolve the promise when the callback is called
        })
      })
    })

    // Once all promises are resolved, update the state
    Promise.all(promises).then(() => {
      setRoomTabs([...roomTabs])
    })
    // check  rooms array includes username
    if (!localStorageRoomsArr.includes(username)) {
      console.log(roomTabs);
      // if not, join and add it
      socket.emit('join', '2222', username, (room, count) => {
        console.log(`joined room ${room}, count is ${count}`)
        setlocalStorageRoomsArr([...localStorageRoomsArr, username])
        setRoomTabs(roomTabs=>[...roomTabs, { room, users: count }])
      })
    }

    socket.on('joined', ({ room, count, from }) => {
      //increment count in room when OTHER people join
      console.log(roomTabs);
      console.log('socket  received joined event', { room, count, from })
      //if from is my id then return
      if (from === socket.id)
      {
        console.log(`req to join ${room}  is from ${from}, same as socket id ${socket.id}`)
        return
      }


      // increment count in room
      const index = roomTabs.findIndex(obj => obj.room === room)
      console.log(roomTabs);
      console.log(room);
      // if index is -1, room is not in roomTabs and should be added
      console.log(`index of room ${room} is ${index}`);
      if (index === -1) {
        console.log(`room ${room} is not in roomTabs, adding it`);
        roomTabs.push({ room, users: count })
        console.log([...roomTabs])
        setRoomTabs([...roomTabs])
        return
      } else if (index !== -1) {
      roomTabs[index] = { room, users: count }
      console.log(`roomTabs is ${roomTabs}`)
      console.log(roomTabs);
      // update roomTabs
      setRoomTabs([...roomTabs])
      }
    })

    socket.on('connect_error', (err) => {
      // console.log('connection error, failed to connect')
      console.log(err)
      // socket.disconnect()
      // socket.close()
      // socket.removeAllListeners()
    })
    socket.on('disconnect', () => {
      console.log('DISCONNECTED')
      setSocketConnection('false')
    })
    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('join')
      socket.off('joined')
      socket.off('disconnect')
    }
  }, [socket, localStorageRoomsArr, username,  setRoomTabs])

  // useEffect isConnected
  console.log('LAST CHANCE');
  console.log(roomTabs);
  return (

    <>
      {username === null &&

        <div className='h-screen  text-center bg-slate-400'>
          <div className=' bg-slate-200 rounded-lg relative top-1/4 border w-2/4  mx-auto px-8 py-4 shadow-2xl'>
            <h1 className='pb-3 '>
              enter a username!
            </h1>
            <input className=' border-2 rounded-md  text-center border-neutral-400 focus:border-red-500' ref={inputEl} type="text" onKeyDown={(e) => inputName(e, setUsername)} placeholder='enter username and hit enter' />
          </div>
        </div>}
      {username !== null && (
        <div>
          {/* <Outlet username={username}/> */}
          {/* <p>socket connected?  {socketConnection} id = {socketId}</p> */}
          <Main  username={username} localStorageRoomsArr={localStorageRoomsArr} setlocalStorageRoomsArr={setlocalStorageRoomsArr} socket={socket} socketConnection={socketConnection} setSocketConnection={setSocketConnection} socketId={socketId} />
        </div>
      )}
    </>
  )
}
export default App
