import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

function Landing() {

  return (
    <>
      <div className="logo">
        <img src="https://i.imgur.com/yEUfhhW.png" className="logo-for-home" />
      </div>
      <div className="landing-main">
        <h1 className="hi-there">Hi there!</h1>
        <h1 className="welcome-to">
          <span className="reveal-text">Welcome to</span>
          <br />
          Pet Care by Kubra & Zack!
        </h1>
      </div>
      <div className="about-us">
        <h2 className="h2-about-us">About Us</h2>
        <p className="welcome-text">
          We, Kubra & Zack, are a married couple who love dogs and have turned
          that love into a dog walking business. We have been providing our
          services in Downtown Jersey City for more than 2 years. Our services
          include daily walks and boardings.
        </p>
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
