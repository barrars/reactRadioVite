import React from 'react'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'

export default function Chats ({ chats, username }) {
  const online = useOnlineStatus()

  return (
    <div id='chatList' className='col-span-1 bg-slate-300 overflow-x-hidden '>

      {!online && <p className='text-2xl text-center'>You are offline</p>}
      {online && chats?.map((chat, i) => <Chat key={i} chat={chat} />)}
    </div>
  )
}

const Chat = ({ chat }) => {
  const { username, message, timestamp, color } = chat
  return (
    <div className='flex border-b-2 border-black  ' title={new Date(timestamp).toLocaleString()}>

      {/* <p className='bg-red-400 pr-3 mb-0'>{name}</p> */}
      {/* <p className={`bg-[${color}] pr-3 mb-0`}>{name}</p> */}
      <p style={{ background: `${color}` }} className='bg-red-400 pr-3 mb-0'>{username}</p>
      <p className='bg-green-300 pl-3 mb-0'>{message}</p>

    </div>)
}
