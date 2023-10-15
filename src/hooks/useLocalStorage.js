import { useState, useEffect } from 'react'

function useLocalStorage (key, initialValue) {
  // Get the initial value from localStorage or use the provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
      // return item || initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Save the value to localStorage when it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.log(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
