import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import { Settings } from "./pages/Settings";
import { ExamplesPage } from "./pages/ExamplesPage";
import { Test } from "./pages/Test";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/Conversationally" />} />
      <Route path="Conversationally">
      <Route path="test" element={<Test />} />
          <Route path="" element={<ExamplesPage />} />
          <Route path="chat" element={<ChatPage />} />
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
