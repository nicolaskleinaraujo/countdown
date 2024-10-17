// Modules
import Router from './utils/router'
import dbFetch from './config/axios'
import { useContext, useEffect } from 'react'
import { UserContext } from './context/UserContext'

function App() {
  const { setUserId, setUserPages } = useContext(UserContext)

  const tryAuth = async() => {
    const res = await dbFetch.post("/users/tryauth")

    setUserId(res.data.user.id)
    setUserPages(res.data.user.pages)
  }

  useEffect(() => {
    tryAuth()
  }, [])

  return (
    <>
      <Router />
    </>
  )
}

export default App
