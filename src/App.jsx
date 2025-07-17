import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatApp from './chatApp'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Welcome! Go to <a href="/chat">Chat</a></div>} />
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </Router>
  )
}

export default App
