import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ChatBox ({ socket, chats, setChats, username, localStorageRoomsArr }) {
  const { roomid } = useParams()

  useEffect(() => {
    // console.log('socket', socket)
    if (!socket) return

    socket.on('chat message', (data) => {
      console.log(chats)
      console.log('chat message', data)
      const { chatRoom } = data
      /* if not currently in this that chatroom return */
      if (chatRoom !== roomid) return
      setChats([...chats, data])
    })
    socket.on('roommsg', (msg) => {
      console.log(msg)
      // console.log('chat message from someone', msg)
      setChats([...chats, msg])
    // console.log(chats)
    })
    socket.on('receiveMessage', (msg) => {
      console.log('receiveMessage', msg)
    })
    return () => {
      socket.off('chat message')
      socket.off('roommsg')
      socket.off('receiveMessage')
    }
  }, [socket, chats, setChats])

  const chatHandler = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const room = roomid === undefined ? '' : roomid
      console.log('you sent a chat to room', room)
      console.log('your socketID id ' + socket.id)
      const message = e.target.value
      // console.log(import.meta.env.VITE_REACT_APP_URL);
      fetch(import.meta.env.VITE_REACT_APP_URL + '/chatList/' + room, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, message, localStorageRoomsArr, id: socket.id })
      })
        .then(res => res.json())
        .then(data => {
          if (data.msg === 'saved') {
            console.log('success')
            return
          }
          console.log(`your msg posted succesfully via post: ${JSON.stringify(data)}`)
          /* test */
          // socket.emit('sendMessage', { username, message, room })
        })
      e.target.value = ''
    }
  }
  return (
    <input onKeyDown={(e) => chatHandler(e)} type="text" placeholder='chat here'/>
  )
}
