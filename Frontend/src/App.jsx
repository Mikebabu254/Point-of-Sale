import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home  from './pages/Home';
import Login from './pages/Login';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
