import "./home.css";
import { useState } from "react";
import logo2 from "../../Assets/logo2.png";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer.jsx"

function Home({ user }) {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div className="logo">
        <img src="https://i.imgur.com/LU2iCr6.png" className="logo-for-home" />
      </div>
      <div className="home-container">
        <h1>Hello {user?.first_name}!</h1>
        <h3>Need a walk soon?</h3>
        <Link to="/reserve">
          <button>Schedule Now</button>
        </Link>
      </div>
      <div className="images-container">
        <img
          src="https://i.imgur.com/u2fi4GF.png"
          alt="Image"
          className="image-container-images1"
        />
        <img
          src="https://i.imgur.com/4ZU0Bv4.png"
          alt="Image"
          className="image-container-images2"
        />
        <img
          src="https://i.imgur.com/HeWAiIe.png"
          alt="Image"
          className="image-container-images3"
        />
        <img
          src="https://i.imgur.com/Iohduo6.png"
          alt="Image"
          className="image-container-images4"
        />
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
