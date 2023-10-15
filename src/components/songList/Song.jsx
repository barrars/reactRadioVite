import React from 'react'
export default function Song ({ click, cached, song, cacheSongHandler, deleteSongHandler, mainStore, setCachedSongs }) {
  // const clack = () => socket.emit('bish', `from client ${socket.id}`)
  // console.info(song, cached)
  return (
    <div className='hover:bg-slate-300 cursor-pointer hover:border-orange-500 border-2'>
      <p className='bg-slate-400/30' onClick={click}>{song.fileName || song}</p>
      {
        cached === 'Cached'
        // cached.includes(song.fileName)
          ? <button className='bg-slate-400/30 hover:border-red-300 border-2' onClick={() => deleteSongHandler(song.fileName, mainStore, setCachedSongs)}>delete from cache</button>
          : <button className='bg-green-400/30 hover:border-red-300 border-2' onClick={() => cacheSongHandler(song.fileName, mainStore, setCachedSongs)}>save this song</button>
      }    </div>
  )
}
