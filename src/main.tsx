import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import App from './App'
import { initFirebase, trackPageView } from './lib/firebase'
import './index.css'

// Initialize Firebase Analytics before rendering
initFirebase().then(() => {
  // Log the initial page view on load
  trackPageView()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_V3_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
)
