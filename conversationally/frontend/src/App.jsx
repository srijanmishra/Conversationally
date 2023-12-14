import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import { Settings } from "./pages/Settings";
import { ExamplesPage } from "./pages/ExamplesPage";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/Conversationally" />} />
      <Route path="Conversationally">
          <Route path="examples" element={<ExamplesPage />} />
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
