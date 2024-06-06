import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call the passed down handleLogout function to perform logout logic
    navigate("/"); // Then navigate to home page
  };

  return (
    <div>
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        {user && (
          <>
            <a className="menu-item" href="/home">
              HOME
            </a>
            <a className="menu-item" href="/profile">
              PROFILE
            </a>
            <a className="menu-item" href="/reserve">
              BOOKING
            </a>
          </>
        )}
        <a className="menu-item" href="/about">
          ABOUT US
        </a>
        <a className="menu-item" href="/contact">
          CONTACT US
        </a>
        {user ? (
          <button onClick={handleLogoutClick} className="menu-item signout-button">
            SIGN OUT
          </button>
        ) : (
          <a className="menu-item" href="/signin">
            SIGN IN
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
