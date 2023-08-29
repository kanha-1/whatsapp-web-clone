import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { useSelector } from "react-redux"
function App() {
  const { user } = useSelector((state) => ({ ...state.user }))
  const access_token = user?.access_token
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route exact path="/" element={access_token ? <Home /> : <Navigate to="/login" />} />
          <Route exact path="/register" element={!access_token ? <Register /> : <Navigate to="/" />} />
          <Route exact path="/login" element={!access_token ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
