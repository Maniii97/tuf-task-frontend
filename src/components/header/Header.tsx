import React from "react";
import { Link } from "react-router-dom";
import './Header.css'; 

const Header: React.FC = () => {
  return (
    <nav className="Header">
      <div className="container">
        <Link to="/" className="logo">
          TakeUForward
        </Link>
        <div>
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/dashboard" className="link">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
