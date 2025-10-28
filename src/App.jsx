import EmailGeneration from './components/emailGeneration.jsx';
import HomePage from './components/homePage.jsx'
import LoginPage from './components/login.jsx'
import SignUpPage from './components/signup.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import './App.css'

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/emailGenerator" element={<EmailGeneration/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/" element={isAuthenticated?<HomePage/>:<Navigate to="/login"/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
