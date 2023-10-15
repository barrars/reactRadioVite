import React, { useEffect, useState } from 'react'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'
// import { useNavigate } from 'react-router-dom'

export default function Jukebox ({ setSongList, songList, rooms, setRooms, socket, socketId, setSocketConnection, socketConnection }) {
  useEffect(() => {
    socket?.on('song', ({ song }) => {
      console.log('song', { song, status })
      setSongList((prev) => [...prev, song])
      console.log('songList', songList)
      // setSongList([...songList, song])
    })
    socket?.on('click', (data) => {
      console.log('click', data)
    })
    socket?.on('eta', (data) => {
      console.log('eta', data)
    })
    return () => {
      socket?.off('song')
      socket?.off('click')
      socket?.off('eta')
    }
  }, [socket, songList])
  const online = useOnlineStatus()
  const [downloading, setDownloading] = useState(false)
  const search = (e) => {
    const socketOBJ = {
      socket: socket.id,
      username: socket.username
    }
    if (e.key === 'Enter') {
      console.log(socketOBJ)
      if (e.target.value === '') return
      const val = e.target.value
      e.target.value = ''
      setDownloading(true)
      fetch(process.env.REACT_APP_URL + '/search?q=' + val.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socketOBJ)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          // setSongList([...songList, data])
          setDownloading(false)
        })
    }
  }

  // const enterRoom = (e) => {
  //   if (e.key === 'Enter') {
  //     addRoom(roomRef.current.value)
  //   } else if (e.key === 'Escape') {
  //     roomRef.current.value = ''
  //   }
  // }
  // const btnClick = () => {
  //   addRoom(roomRef.current.value)
  // }
  return (
      <div className='content-center flex  text-center row-span-2'>

        <input type="text"
          onKeyDown={(e) => search(e)}
          className='bg-gray-200 rounded-lg p-2 m-2 w-1/2'
          placeholder={`${downloading ? 'Downloading...' : 'Search for a song'}`}
          disabled={downloading}
        />
        {/* <input ref={roomRef} onKeyDown={(e) => enterRoom(e)} className=' bg-slate-200 m-2 rounded-md' type="search" placeholder='enter room' />
        <button className='bg-gray-300 m-2 px-3 rounded-md border border-blue-400 text-lg font-mono'
          onClick={btnClick}>
          enter
        </button> */}
        <p className={` h-2 w-2 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`} />
        <p>socket connected?  {socketConnection} id = {socketId}</p>

      </div>
  )
}
