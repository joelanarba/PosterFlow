import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { Toaster } from 'react-hot-toast'
import { initSentry } from './utils/sentry'

// Initialize Sentry before app renders
initSentry();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Toaster position="top-center" />
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
