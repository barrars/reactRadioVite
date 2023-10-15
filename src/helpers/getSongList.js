export default async function getSongList () {
  // console.log('getting songlist')
  try {
    const songList = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/songlist`)
    return await songList.json()
  } catch (err) {
    console.error({ msg: 'offline?', err })
    return err
  }
}
