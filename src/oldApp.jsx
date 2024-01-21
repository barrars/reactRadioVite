import { useCallback, useEffect, useRef, useState } from 'react';
import Main from './components/Main';
import { inputName } from './helpers/methods';
import useSocket from './hooks/useSocket';
import useLocalStorage from './hooks/useLocalStorage';
import { useRoomTabs } from './context/RoomtabsContext';

const App = () => {
  const [localStorageRoomsArr, setLocalStorageRoomsArr] = useLocalStorage('rooms', ['main']);
  const { roomTabs, setRoomTabs } = useRoomTabs();
  const [username, setUsername] = useLocalStorage('username', null);
  const [socketConnection, setSocketConnection] = useState(false);
  const [socketId, setSocketId] = useState('unset');
  const inputEl = useRef(null);
  const socket = useSocket();

  // Custom hook or function to initialize socket connection and event listeners
  useSocketInitializer(socket, username, localStorageRoomsArr, setLocalStorageRoomsArr, roomTabs, setRoomTabs, setSocketId, setSocketConnection);
  inputEl?.current?.focus()

  useEffect(() => {
    if (username) {
      console.log('username is', username);
      inputEl.current?.focus();
      if (window.location.pathname === '/') {
        window.location.pathname = '/main';
      }
      if (socket) {
        socket.username = username;
      }

    }
  }, [username, socket]);

  const handleUsernameInput = (e) => inputName(e, setUsername);

  return (
    <>
      {!username ? (
        <div className='h-screen text-center bg-slate-400'>
          <div className='bg-slate-200 rounded-lg relative top-1/4 border w-2/4 mx-auto px-8 py-4 shadow-2xl'>
            <h1 className='pb-3'>
              Enter a username!
            </h1>
            <input
              ref={inputEl}
              type="text"
              onKeyDown={handleUsernameInput}
              placeholder='Enter username and hit enter'
              className='border-2 rounded-md text-center border-neutral-400 focus:border-red-500'
            />
          </div>
        </div>
      ) : (
        <Main
          username={username}
          localStorageRoomsArr={localStorageRoomsArr}
          setLocalStorageRoomsArr={setLocalStorageRoomsArr}
          socket={socket}
          socketConnection={socketConnection}
          socketId={socketId}
        />
      )}
    </>
  );
};

export default App;

// A function or custom hook to handle the socket initialization and event listeners
function useSocketInitializer(socket, username, localStorageRoomsArr, setLocalStorageRoomsArr, roomTabs, setRoomTabs, setSocketId, setSocketConnection) {
  const [hasJoinedInitialRooms, setHasJoinedInitialRooms] = useState(false);
  const handleJoinedEvent = useCallback(({ room, count, from }) => {

      //increment count in room when OTHER people join
      console.log(roomTabs);
      console.log('socket  received joined event', { room, count, from })
      //if from is my id then return
      if (from === socket.id)
      {
        console.log(`req to join ${room}  is from ${from}, same as socket id ${socket.id}`)
        return
      }
      // increment count in room when OTHER people join
      setRoomTabs(prev => {
      const roomIndex = prev.findIndex(obj => obj.room === room)
      if (roomIndex === -1) return prev;
      const newRoomTabs = [...prev];
      newRoomTabs[roomIndex] = { ...newRoomTabs[roomIndex], count };
      return newRoomTabs;
  }, [setRoomTabs, socket]);
}, [setRoomTabs, socket, roomTabs]);

const handleConnection = useCallback(() => {
  setSocketId(socket.id)
  setSocketConnection('true')
}, [ setSocketConnection, setSocketId, socket ]);

  const handleErrorEvent = useCallback((err) => {
    console.log('connection error, failed to connect');
    console.log(err);
    setSocketConnection(false);
  }, [setSocketConnection]);

  const handleDisconnectEvent = useCallback(() => {
    setSocketConnection(false);
  }, [setSocketConnection]);

  useEffect(() => {
    if (!socket || !username) return;

    socket.connect();
    setSocketConnection(true);
    setSocketId(() => socket.id);

    // Here we set up event listeners
    socket.on('connect', handleConnection);
    socket.on('joined', handleJoinedEvent);
    socket.on('connect_error', handleErrorEvent);
    socket.on('disconnect', handleDisconnectEvent);

    // Clean up the event listeners when the component unmounts or when socket changes
    return () => {
      socket.off('joined', handleJoinedEvent);
      socket.off('connect_error', handleErrorEvent);
      socket.off('disconnect', handleDisconnectEvent);
      socket.off('connect', handleConnection);
    };
  }, [ socket, username, roomTabs ]);

  useEffect(() => {
    if (!socket || !username || hasJoinedInitialRooms) return;
      const joinRoomPromises = localStorageRoomsArr.map(room =>
        new Promise(resolve => {
          console.log('joining rooms from local storage', room);
          socket.emit('join', '1111', room, (r, c) => {
            console.log(`joined room ${r}, count is ${c}`);
            resolve({ room: r, count: c });
          });
        })
      );

      Promise.all(joinRoomPromises).then(results => {
        console.log('results', results);
        const newRoomTabs = results.map((r, i) => ({ ...roomTabs[i], ...r }));
        console.log('new room tabs', newRoomTabs);
        setRoomTabs(newRoomTabs);
        setHasJoinedInitialRooms(true);
      });

    }, [socket, username, localStorageRoomsArr]);



}

