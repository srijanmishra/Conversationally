import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './components/Login.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Auth0Provider
      domain="dev-hcutf1dzts3o8n8w.us.auth0.com"
      clientId="3GDn1MwPdZerVNra7SzxjEFfNH0dCaFB"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <LoginButton />
      yooo
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
