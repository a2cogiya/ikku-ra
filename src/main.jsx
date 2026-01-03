import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './SushiPlate.css'
import SushiPlate from './SushiPlate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SushiPlate />
  </StrictMode>,
)
