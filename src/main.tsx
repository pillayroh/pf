import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SoundProvider } from './hooks/useSound'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SoundProvider>
        <App />
      </SoundProvider>
    </BrowserRouter>
  </StrictMode>,
)
