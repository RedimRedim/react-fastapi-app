import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Files from "./pages/Files";
import Navbar from "./components/Navbar";
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
              <Route exact path="/Files" element={<Files />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
