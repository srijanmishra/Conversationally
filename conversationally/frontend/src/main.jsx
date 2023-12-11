import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.scss";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-hcutf1dzts3o8n8w.us.auth0.com"
        clientId="3GDn1MwPdZerVNra7SzxjEFfNH0dCaFB"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Layout>
          <App />
        </Layout>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
