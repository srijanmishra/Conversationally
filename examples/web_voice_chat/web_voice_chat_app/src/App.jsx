import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';

const App = () => {

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>

      
    </BrowserRouter>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
