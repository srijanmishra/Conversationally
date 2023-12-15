import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import { Settings } from "./pages/Settings";
import { Payment } from "./pages/Payment";
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {

  const { isAuthenticated } = useAuth0();
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/Conversationally" />} />
      <Route path="Conversationally">
          {
            isAuthenticated?
            <>
              <Route path="" element={<ChatPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="payment" element={<Payment />} />
            </>
            :
            <>
              <Route path="" element={<LandingPage />} />
            </>
          }

      </Route>
    </Routes>
    </>
  );
};

export default App;
