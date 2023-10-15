// /* eslint-disable no-unused-vars */
// import React, { useEffect, useRef, useState } from 'react'
// import Main from '../components/Main'
// import useSocket from '../hooks/useSocket'
// import { useOnlineStatus } from '../helpers/useOnlineStatus'
// import { inputName } from '../helpers/methods'
// import useLocalStorage from '../hooks/useLocalStorage'
// import { Outlet, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit } from 'react-router-dom'
// import { getContacts, createContact } from '../contacts'

// export async function loader ({ request }) {
//   const url = new URL(request.url)
//   const q = url.searchParams.get('q')
//   const contacts = await getContacts(q)
//   return { contacts, q }
// }
// export async function action () {
//   const contact = await createContact()
//   return redirect(`/contacts/${contact.id}/edit`)
// }
// const Root = () => {
//   const submit = useSubmit()
//   const navigation = useNavigation()
//   const searching = navigation.location &&
//   new URLSearchParams(navigation.location.search).has('q')
//   const { contacts, q } = useLoaderData()
//   const [userName, setUserName] = useLocalStorage('name', '')
//   // console.log(navigation.location)
//   // console.log(new URLSearchParams(navigation.location.search).has('q'))
//   useEffect(() => {
//     document.getElementById('q').value = q
//   }, [q])
//   const socket = useSocket()
//   // const [username, setUsername] = useState('')
//   const online = useOnlineStatus()
//   const inputEl = useRef(null)
//   useEffect(() => {
//     inputEl?.current?.focus()
//     // if (!socket) return
//     if (!userName) return
//     socket?.on('connect', () => {
//       socket.username = userName
//       console.log('id = ' + socket.id + ' connected')
//     })
//   }, [userName])

//   // useEffect(() => {
//   //   // socket.connect(username)
//   //   if (username !== '' && online) {
//   //     socket.username = username
//   //     console.log(socket.username)
//   //     // console.log(socket.data)
//   //     socket.emit('join', socket.username,
//   //       res => console.log({ res }))
//   //   }
//   //   socket.on('connect_error', (err) => {
//   //     console.log('connection error, failed to connect')
//   //     console.log(err)
//   //     socket.disconnect()
//   //     socket.close()
//   //     socket.removeAllListeners()
//   //   })
//   //   socket.on('disconnect', () => {
//   //     console.log('DISCONNECTED')
//   //   })

//   //   return () => {
//   //     socket.off('connect_error')
//   //     socket.off('join')
//   //     console.log('disconnecting')
//   //     socket.off('connect')
//   //     socket.off('disconnect')
//   //   }
//   // }, [username, online, socket])

//   return (
//     <>
//       {userName === '' && (
//         <div className="h-screen  text-center bg-slate-400">
//           <div className=" bg-slate-200 rounded-lg relative top-1/4 border w-2/4  mx-auto px-8 py-4 shadow-2xl">
//             <h1 className="pb-3 ">enter a username!</h1>
//             <input
//               className=" border-2 rounded-md  text-center border-neutral-400 focus:border-red-500"
//               ref={inputEl}
//               type="text"
//               onKeyDown={(e) => inputName(e, setUserName)}
//               placeholder="enter username and hit enter"
//             />
//           </div>
//         </div>
//       )}
//       {userName !== '' && (
//         <div>
//           <Main username={userName} />
//           {/* <Form id="search-Form" role="search">
//             <input
//               id="q"
//               style={searching ? { backgroundColor: 'yellow' } : { backgroundColor: 'white' }}
//               aria-label="Search contacts"
//               placeholder="Search"
//               type="search"
//               name="q"
//               defaultValue={q}
//               onChange={(e) => {
//                 const isFirstSearch = q == null
//                 console.log(isFirstSearch)
//                 submit(e.currentTarget.form, { replace: !isFirstSearch })
//               }}
//             />
//             <div
//               id="search-spinner"
//               aria-hidden
//               hidden={!searching}
//             />
//             <div
//               className="sr-only"
//               aria-live="polite"
//             ></div>
//           </Form>
//           <nav>

//             <Form method="post">
//               <button type="submit">New Contact</button>
//             </Form>
//             {contacts.length
//               ? (
//               <ul>
//                 {contacts.map((contact) => (
//                   <li key={contact.id}>
//                     <NavLink to={`contacts/${contact.id}`}

//                       style={({ isActive, isPending }) =>
//                         isActive ? { backgroundColor: 'yellow' } : isPending ? { backgroundColor: 'blue' } : { backgroundColor: 'white' }}>

//                       {contact.first || contact.last
//                         ? (
//                         <>
//                           {contact.first} {contact.last}
//                         </>
//                           )
//                         : (
//                         <i>No Name</i>
//                           )}{' '}
//                       {contact.favorite && <span>★</span>}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//                 )
//               : (
//               <p>
//                 <i style={{ color: 'red' }}>No contacts</i>
//               </p>
//                 )}
//           </nav>
//           <div style={navigation.state === 'loading' ? { backgroundColor: 'orange' } : { backgroundColor: 'gray' }}>
//                 <p>{navigation.state === 'loading' ? 'loading' : 'idle'}</p>
//           <Outlet />
//           </div> */}
//         </div>
//       )}
//     </>
//   )
// }

// export default Root
