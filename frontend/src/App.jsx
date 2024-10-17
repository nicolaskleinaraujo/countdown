// Modules
import Router from './utils/router'
import dbFetch from './config/axios'
import { useContext, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import 'react-toastify/dist/ReactToastify.css'
import { Flip, ToastContainer } from 'react-toastify'

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
