import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";
import Register from "./Register";
import Login from "./Login";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  // ✅ Token ko state me rakha
  const [token, setToken] = useState(localStorage.getItem("token"));

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    token, setToken   // context me bhi diya
  };

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
        <Routes>
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          
          {/* Protected Chat Page */}
          <Route path="/chat" element={
            token 
              ? <><Sidebar /><ChatWindow /></> 
              : <Navigate to="/login" />
          } />

          {/* Default Route → Redirect */}
          <Route path="*" element={<Navigate to="/chat" />} />
        </Routes>
      </MyContext.Provider>
    </div>
  )
}

export default App;
