import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="logo">
        <p className="logo-text">Pet Care by Kubra & Zack</p>
        <p className="logo-text-2">We are here for you...</p>
      </div>
      <div className="gallery"></div>
      <div className="landing-main">
        <img src="https://i.imgur.com/nXLDE7D.jpeg" className="welcome-img"/>
      </div>
      <div className="buttons">
        <Link to="/signin">
          <button className="link-to-signin">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="link-to-signin">Join Now</button>
        </Link>
      </div>
    </>
  );
}

export default Landing;
