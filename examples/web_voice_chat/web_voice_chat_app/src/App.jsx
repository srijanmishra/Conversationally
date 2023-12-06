import { Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LandingPage />} />
        <Route path="/" element={<ChatPage />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </>
  );
}

export default App
