import { Route, Routes } from 'react-router-dom'

import LogIn from './components/LogIn'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
      </Routes>
      <Routes>
        <Route path="/sign_in" element={<SignIn />} />
      </Routes>
      <Routes>
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
