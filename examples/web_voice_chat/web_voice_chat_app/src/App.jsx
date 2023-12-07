import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import { Settings } from "./pages/Settings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;
