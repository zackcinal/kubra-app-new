import React from "react";
import "./footer.css";
import Wave from "react-wavify";

function Footer() {
  return (
    <div className="footer-container">
      <Wave
        fill="rgb(37,52,75)"
        paused={false}
        options={{
          height: 10,
          amplitude: 20,
          speed: 0.15,
          points: 4,
        }}
        className="footer-wave"
      />
      <div className="footer-content">
        <h3>Contact Us</h3>
        <p><a href="mailto:kubraatesusa@gmail.com">kubraatesusa@gmail.com</a></p>
        <p className="phone">718-308-6768</p>
      </div>
    </div>
  );
}

export default Footer;
