import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Context
import { UserProvider } from './context/UserContext.jsx'
import { RedirectProvider } from './context/RedirectContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RedirectProvider>
        <App />
      </RedirectProvider>
    </UserProvider>
  </StrictMode>,
)
