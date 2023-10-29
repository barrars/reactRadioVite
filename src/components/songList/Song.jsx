import React from 'react'
export default function Song ({ click, cached, song, cacheSongHandler, deleteSongHandler, mainStore, setCachedSongs }) {
  // const clack = () => socket.emit('bish', `from client ${socket.id}`)
  // console.info(song, cached)
  return (
    <div className='hover:bg-slate-300 cursor-pointer hover:border-orange-500 border-2'>
      <p className='bg-slate-400/30' onClick={click} data-element={song.fileName}>{song.title || song}</p>
      {
        cached === 'Cached'
        // cached.includes(song.fileName)
          ? <button className='bg-slate-400/30 hover:border-red-300 border-2' data-cachedsong={song.title} onClick={(e) => deleteSongHandler(e, song.fileName || song, mainStore, setCachedSongs)}>delete from cache</button>
          : <button className='bg-green-400/30 hover:border-red-300 border-2' data-cachedsong={song.title} onClick={(e) => cacheSongHandler(e, song.fileName ||song , mainStore, setCachedSongs)}>save this song</button>
      }    </div>
  )
}
