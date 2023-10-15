import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Tabs ({ localStorageRoomsArr, setlocalStorageRoomsArr, socket, roomTabs, setroomTabs }) {
  const navigate = useNavigate()
  const roomRef = useRef(null)
  // console.log('local storage rooms', localStorageRoomsArr)

  const addRoom = (room) => {
    console.log('add room', room)
    if (room !== '' && !localStorageRoomsArr.includes(room)) {
      console.log('emit join-room with data: ', room)
      socket.emit('join', '4444', room, (room, count) => {
        console.log(`emitted join ${room}`)
        roomRef.current.value = ''
        setlocalStorageRoomsArr([...localStorageRoomsArr, room])
        setroomTabs([...roomTabs, { room, users: count }])
        navigate(`/${room}`)
      })
    }
  }
  const removeRoom = (room) => {
    console.log('remove room', room)
    if (room === 'main') return
    if (room === socket.username) return
    socket.emit('leave', room, (room) => {
      console.log(`before leaving ${roomTabs}`)
      roomTabs.splice(roomTabs.findIndex(obj => obj.room === room), 1)
      console.log(`removed room ${room}`, roomTabs)
      setroomTabs([...roomTabs])
      setlocalStorageRoomsArr(localStorageRoomsArr.filter(r => r !== room))
      navigate('/main')
    })
  }
  socket?.on('left', ({ room, count }) => {
    console.log(`left room ${room}, count is ${count}`)
    // set count for room in roomTabs
    const roomTab = roomTabs.findIndex(obj => obj.room === room)
    roomTabs[roomTab] = { room, users: count }
    setroomTabs([...roomTabs])
  })

  const joinRoom = (room) => {
    console.log(`clicked on tab to join room: ${room}`)
    // if room is not in rooms, add it
    // const roomExists = localStorageRoomsArr.includes(room)
    // if (!roomExists) {
    // if () {
    // }
    console.log(`join room ${room}`)
    socket.emit('join', '5555', room, (room, count) => {
      console.log(room, count)
      roomRef.current.value = ''
      // setlocalStorageRoomsArr([...localStorageRoomsArr, room])
      // setroomTabs([...roomTabs, { room, users: count }])
      navigate(`/${room}`)
    })
  }
  const enterRoom = (e) => {
    if (e.key === 'Enter') {
      addRoom(roomRef.current.value)
    } else if (e.key === 'Escape') {
      roomRef.current.value = ''
    }
  }
  const btnClick = () => {
    addRoom(roomRef.current.value)
  }
  return (
    <div className=' bg-slate-200 flex flex-row '>

      <div className='flex flex-grow'>

        {roomTabs.map((room, i) => {
          return (

              <div key={`${room.room + i}`} className='relative group select-none '>

              <NavLink onClick={() => joinRoom(room.room)} to={`/${room.room}`} className={({ isActive }) => ' rounded-t-2xl py-2 px-4 text-sm font-semibold text-gray-700 border-2 border-gray-300 bg-white' + (isActive ? 'bg-slate-500 pointer-events-none' : '') } >
                {`${room.room} (${room.users})`}
              </NavLink>
              <i onClick={() => removeRoom(room.room)} className=' -top-1 right-1 absolute rounded-xl cursor-pointer invisible group-hover:visible '>x</i>
            </div>
          )
        })}
          </div>
        <div className=''>
          <input ref={roomRef} onKeyDown={(e) => enterRoom(e)} className=' bg-slate-200 m-2 rounded-md' type="search" placeholder='enter room' />
          <button className='bg-gray-300 m-2 px-3 rounded-md border border-blue-400 text-lg font-mono'
            onClick={btnClick}>
            enter
          </button>
        </div>
        {/* <div className='items-end justify-end content-end grow'>
          {socket?.username &&
            <p className='text-right text-xs text-gray-500'>
              logged in as {socket.id} {socket.username}</p>}
        </div> */}

    </div>
  )
}
