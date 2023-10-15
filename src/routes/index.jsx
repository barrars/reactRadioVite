import React from 'react'
// calsses object
const classNames = {
  root: 'flex flex-col items-center justify-center min-h-screen py-2',
  code: 'bg-gray-800 rounded-b-lg p-4',
  title: 'text-4xl font-bold',
  description: 'text-2xl text-gray-600 mt-3',
  grid: 'flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full',
  card: 'm-2 w-96 sm:w-96 md:w-96 lg:w-96 xl:w-96 flex flex-col items-center justify-center p-6 text-center border border-gray-300 rounded-xl',
  logo: 'h-12 w-12',
  link: 'text-blue-500 hover:text-blue-600',
  footer: 'flex items-center justify-center w-full h-24 border-t',
  footerText: 'text-gray-500'
}

export default function Index () {
  return (
    <div className={classNames.root}>
      <h1 className={classNames.title}>index</h1>
    </div>
  )
}
