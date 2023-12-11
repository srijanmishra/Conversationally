import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import { Settings } from "./pages/Settings";

const PrefixedRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/Conversationally" element={props.children} />
        {/* <Route path="/Conversationally/login" element={<LandingPage />} />
        <Route path="/Conversationally/settings" element={<Settings />} /> */}
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <>
    <Routes>
      <Route path="Conversationally">

          <Route path="" element={<ChatPage />} />
          <Route path="login" element={<LandingPage />} />
          <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
      {/* <PrefixedRoutes>
      </PrefixedRoutes> */}
    </>
  );
};

export default App;
