import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Files from "./pages/Files";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="App">
        <div className="main-container">
          <div className="navbar-content">
            <Navbar />
          </div>
          <main className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
