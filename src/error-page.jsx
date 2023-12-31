import React from 'react'
import { useRouteError } from 'react-router-dom'
export default function ErrorPage () {
  const error = useRouteError()
  console.error(error)
  return (
    <div>error-page
      <h1>Whoops!</h1>
      <p>Sorry, an upexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

    </div>
  )
}
