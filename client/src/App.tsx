import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SignIn from './components/SignIn'
import AppBar from './components/AppBar'
import SignUp from './components/SignUp'
import Chat from './components/Chat'

function App() {
  return (
    <div>
      <Router>
        <AppBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/chat" element={<Chat children={null} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
