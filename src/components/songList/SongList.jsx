import React, { useEffect, useRef, useState } from 'react'
import Song from './Song'
import { cacheSongHandler, deleteSongHandler } from '../../helpers/cacheSongHandlers'
import { mainStore } from '../../helpers/mainStore'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'
// import Socket from '../../socketService'

export default function SongList ({ songList, username }) {
  const online = useOnlineStatus()
  const [currentSong, setCurrentSong] = useState('')
  const [cachedSongs, setCachedSongs] = useState([])
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {
      console.log('turning down volume');
      audioRef.current.volume = 0.5; // Set to 50% volume
  }
  // if cachedSongs is empty, get all keys from mainStore
    if (cachedSongs.length === 0){

      mainStore.keys().then(keys => {
        // console.log('main store ', keys)
        setCachedSongs(keys)
      })
    }
    console.log('cached songs ', cachedSongs);
  }, [ currentSong])
  const [playCachedSong, setplayCachedSong] = useState('')
  const produrl = `${import.meta.env.VITE_REACT_APP_URL}`
  // const produrl = 'https://chat-radio.com'

  const songClickHandler = (e) => {
    //data-element when online, innerText when offline
    const song = e.target.dataset.element || e.target.innerText
    console.log(song)
    online ? setCurrentSong(song) : playCachedSongHandler(song)
  }

  const playCachedSongHandler = song => {
    console.log(song)
    mainStore.getItem(song)
      .then(data => {
        setplayCachedSong(URL.createObjectURL(data))
        console.log(playCachedSong)
      })
  }

  return (
    <>
      {currentSong && <audio autoPlay ref={audioRef} controls src={`${produrl}/downloads/${currentSong}`} />}
      {playCachedSong && <audio autoPlay controls src={playCachedSong} />}
      {online && songList.length > 0 && songList.map((song, i) =>
        <Song key={i} song={song} name={song.fileName} click={songClickHandler} cached={cachedSongs.includes(song.title) ? 'Cached' : 'not cachaed'} cacheSongHandler={cacheSongHandler} deleteSongHandler={deleteSongHandler} mainStore={mainStore} setCachedSongs={setCachedSongs} />)
      }
      {!online && cachedSongs.length > 0 && cachedSongs.map((song, i) => {
        console.log(song)
        return (
          <Song key={i} song={song} name={song} click={songClickHandler} cached={cachedSongs.includes(song) ? 'Cached' : 'not cachaed'} cacheSongHandler={cacheSongHandler} deleteSongHandler={deleteSongHandler} mainStore={mainStore} setCachedSongs={setCachedSongs} />
        )
      })
      }
    </>

  )
}
