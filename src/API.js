import getSonglist from './helpers/getSongList'

export async function loadChats (setChats, room, socketID) {
  // let chats = await fetch('https://chat-radio.com/chatList')
  // if (!socketID) return

  try {
    const chats = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/chatList/${room}`)
    // const chats = await fetch(`${process.env.REACT_APP_URL}/chatList/${room}/${socketID}`)
    const chatsJSON = await chats.json()
    setChats(chatsJSON)
  } catch (error) {
    console.error(error)
  }
}

export async function getSongs (setSongList) {
  const songs = await getSonglist()
  setSongList(songs)
}
