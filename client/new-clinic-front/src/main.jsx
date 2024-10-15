import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NewClinic from './pages/NewClinic.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewClinic />
  </StrictMode>,
)
