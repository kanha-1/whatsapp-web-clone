import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
// socket.io connection
const socket = io("http://localhost:8080")

function App() {
  const { user } = useSelector((state) => ({ ...state.user }))
  const { files } = useSelector((state) => (state.chat))
  const access_token = user?.token
  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route exact path="/" element={access_token ? <Home socket={socket} /> : <Navigate to="/login" />} />
            <Route exact path="/register" element={!access_token ? <Register /> : <Navigate to="/" />} />
            <Route exact path="/login" element={!access_token ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
