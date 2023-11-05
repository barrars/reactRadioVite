import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import reportWebVitals from './reportWebVitals'
import OnlineStatusProvider from './helpers/useOnlineStatus'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import { loader as rootLoader, action as rootAction } from './routes/root'
import ErrorPage from './error-page'
// import Contact, { action as constactAction, loader as contactLoader } from './routes/contact'
// import EditContact, { action as editAction } from './routes/edit'
// import { action as destroyAction } from './routes/destroy'
import Index from './routes'
import App from './App'
import { RoomTabsProvider } from './context/RoomtabsContext'

// import { action as destroyAction } from './routes/destroy'

const router = createBrowserRouter([
  {
    path: '/:roomid?',
    element: <App />,
    // element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [{
      // path: '/:room',
      // element: <Main/>
    // loader: contactLoader,
    // action: constactAction
    },
    // {
    //   path: '/contacts/:contactId/destroy',
    //   action: destroyAction,
    //   errorElement: <div>Oops! there was an error</div>
    // },
    // {
    //   path: '/room/:roomid',
    //   element: <Main />
    // },
    // {
    //   path: '/contacts/:contactId/edit',
    //   element: <EditContact/>,
    //   // loader: contactLoader,
    //   action: editAction
    // },
    {
      index: true,
      element: <Index/>
    }]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <OnlineStatusProvider>
    <RoomTabsProvider>

    <RouterProvider router={router}/>
    </RoomTabsProvider>
    </OnlineStatusProvider>

  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
