import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import { Settings } from "./pages/Settings";
import { Payment } from "./pages/Payment";
import { useAuth0 } from '@auth0/auth0-react';


// const ProtectedRoutes = () => {

//   const { isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   if (isAuthenticated) {
//     return (
//       <>
//         <Route path="" element={<ChatPage />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="payment" element={<Payment />} />
//       </>
//     )
//   }
//   else {
//     return (
//       <Navigate to="/Conversationally/login" />
//     )
//   }
// }

const App = () => {

  const { isAuthenticated } = useAuth0();
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/Conversationally" />} />
      <Route path="Conversationally">
          <Route path="" element={<LandingPage />} />
          {
            isAuthenticated?
            <>
              <Route path="" element={<ChatPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="payment" element={<Payment />} />
            </>
            :
            <>

            </>
          }

      </Route>
    </Routes>
    </>
  );
};

export default App;
