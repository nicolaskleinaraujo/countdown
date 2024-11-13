// Modules
import Router from './utils/Router'
import dbFetch from './config/axios'
import { useContext, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import 'react-toastify/dist/ReactToastify.css'
import { Flip, ToastContainer } from 'react-toastify'

function App() {
  const { setUserId, setUserPages, setSpotifySync } = useContext(UserContext)

  const tryAuth = async() => {
    try {
      const userAuth = await dbFetch.post("/users/tryauth")

      setUserId(userAuth.data.user.id)
      setUserPages(userAuth.data.user.pages)

      await dbFetch.post("/spotify/refresh", {}, {
        headers: { "userId": userAuth.data.user.id }
      })

      setSpotifySync(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    tryAuth()
  }, [])

  return (
    <>
      <ToastContainer 
        position="bottom-center" 
        autoClose={1500} 
        pauseOnHover={false} 
        closeOnClick 
        transition={Flip} 
        theme='dark' 
      />

      <Router />
    </>
  )
}

export default App
