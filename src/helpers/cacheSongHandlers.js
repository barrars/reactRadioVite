/**
 *
 * @param {String} name
 * @param {LocalForage} myDB
 */

export async function cacheSongHandler (e, name, myDB, cacheState) {
  const saveName = e.target.dataset.cachedsong
  try {

    console.info('RUNNING add SONG to cache')
    // fetch(`https://chat-radio.com/downloads/${name}`)

    //make this a GET request
   const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/downloads/${name}`, {
     // mode: 'no-cors',
     method: 'GET',
     headers: {
       'Content-Type': 'audio/mpeg'
      } })
      if (!response.ok) {
        throw new Error('Network response was not ok / failed to fetch song');
      }
      const reader = response.body.getReader()
      const stream = await new ReadableStream({
        async start (controller) {
          while (true) {

            const {done, value} = await reader.read()
            if (done) {
              controller.close()
              return
            }
            controller.enqueue(value)
          }
        }

      })
      const songBlob = await new Response(stream).blob()
      await myDB.setItem(saveName, songBlob)
      // console.info('CACHED ', cachedSong)

      const keys = await myDB.keys()
      cacheState(keys)

    }
    catch (error) {
      console.error(error)
    }
}
/**
 *
 * @param {String} name
 * @param {LocalForage} myDB
 */
export function deleteSongHandler (e, name, myDB, cacheState) {
  const targetName = e.target.dataset.cachedsong

  console.info('RUNNING remove from cache ', targetName)

  myDB.removeItem(targetName)
    .then(() => {
      console.info(`removed ${targetName} from cache`)
      myDB.keys().then(keys => {
        cacheState(keys)
      })
    })
}
