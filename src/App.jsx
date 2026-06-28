import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/login'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Events from "./pages/Events"
import MyTickets from "./pages/MyTickets"

function App() {
  const [count, setCount] = useState(0)

  return (
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/events" element={<Events />}/>
      <Route path="/mytickets" element={<MyTickets />} />
    </Routes>
  )
}

export default App
