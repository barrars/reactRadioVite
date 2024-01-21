/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Chats from './Chats/Chats'
import SongList from './songList/SongList'
import ChatBox from './ChatBox/ChatBox'
import { loadChats, getSongs } from '../API'
import Jukebox from './jukebox/Jukebox'
import { useOnlineStatus } from '../helpers/useOnlineStatus'
import Tabs from './tabs/Tabs'
import { useLocation } from 'react-router-dom'
// import { RoomTabsProvider } from '../context/RoomtabsContext'

export default function Main ({ username, localStorageRoomsArr, setlocalStorageRoomsArr, socket, setSocketConnection, socketConnection, socketId }) {
  console.log(socketId)

  // get navigator location
  // const { roomTabs, setRoomTabs } = useContext(RoomTabsProvider);

  const pathname = useLocation().pathname.split('/')[1]
  // get roomid from url
  // console.log('pathname', pathname || '/')

  const online = useOnlineStatus()
  const [songList, setSongList] = useState([])
  const [chats, setChats] = useState([])
  // if (roomid === undefined) {
  //   nav('/main')
  // }
  useEffect(() => {
    if (!socket) return
    // console.log(pathname)
    // if (!socket?.username) return
    const username = socket?.username
    console.log(`online is ${online} and id is ${username}`)
    console.log(`loading chats and songs for ${pathname} and ${username}`)
    getSongs(setSongList, pathname === undefined ? '/main' : pathname)
    loadChats(setChats, pathname === undefined ? '/main' : pathname, username)
    // if (online && username) {
    // }
  },
  [online, pathname, socket, username])
  // [online, roomid, socket, loadChats, getSongs, nav, setRooms, rooms, username, setChats, setSongList, songList, chats])

  useEffect(() => {
    // scrollTo bottom of chat
    document.getElementById('chatList').scrollTo(0, document.getElementById('chatList').scrollHeight)
  }, [chats?.length, online])

  return (
    <div className='h-screen grid grid-rows-[repeat(12,_minmax(0,_1fr))]'>
      <Tabs localStorageRoomsArr={localStorageRoomsArr} setlocalStorageRoomsArr={setlocalStorageRoomsArr} socket={socket}/>

      <Jukebox socket={socket} setSongList={setSongList} songList={songList} socketConnection={socketConnection} setSocketConnection={setSocketConnection} socketId={socketId}/>
      <div className='row-[span_10_/_span_10] grid grid-cols-2'>

        <Chats chats={chats}/>

        <div className='col-span-1 bg-slate-200 overflow-x-hidden  '>
          <SongList songList={songList} />
        </div>
      </div>
      <div className='bg-red-400 '>
        <ChatBox socket={socket} setChats={setChats} chats={chats} username={username} localStorageRoomsArr={localStorageRoomsArr}/>
      </div>
    </div>
  )
}
