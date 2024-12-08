import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <>
      <nav className="navbar bg-dark h-100">
        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${activeLink === "/" ? "active" : ""}`}
            onClick={() => handleLinkClick("/")}
          >
            Home
          </Link>
          <Link
            to="/Files"
            className={`nav-link ${activeLink === "/Files" ? "active" : ""}`}
            onClick={() => handleLinkClick("/Files")}
          >
            Files
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
