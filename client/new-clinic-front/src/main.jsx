import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import NewClinic from './pages/NewClinic.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <NewClinic />
  </StrictMode>,
)
