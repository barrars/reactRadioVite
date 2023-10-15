import useLocalStorage from './useLocalStorage'
export default function UseRooms () {
  const [rooms, setRooms] = useLocalStorage('rooms', ['main', 'scott'])
  return { rooms, setRooms }
}
