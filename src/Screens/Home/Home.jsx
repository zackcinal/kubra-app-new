import "./home.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer.jsx";

function Home({ user }) {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div className="logo">
        <p className="logo-text">Pet Care by Kubra & Zack</p>
        <p className="logo-text-2">We are here for you...</p>
      </div>
      <div className="home-container">
        <h1 className="hello-user">
          <span>Hello</span>
          <span>{user?.first_name} </span>
          <span>!</span>
        </h1>
        <div className="image-container">
          <img
            src="https://i.imgur.com/tV9JQi3.jpeg"
            className="welcome-image"
          />
        </div>
        <h3>Need a walk soon?</h3>
        <Link to="/reserve">
          <button>Schedule Now</button>
        </Link>
      </div>
      <div className="instagram-container">
        <button className="button-to-instagram">
          <a
            href="https://www.instagram.com/petcarebykubra/"
            className="link-to-instagram"
            target="_blank"
          >
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
              </svg>
              See More on Instagram
            </p>
          </a>
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
