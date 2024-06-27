import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function Landing() {

  const images = [
    {
      original: 'https://i.imgur.com/L1sZ41b.jpeg',
      originalHeight: '100%',
      originalWidth: '100vw'
    },
    {
      original: 'https://i.imgur.com/jcABApg.jpeg',
      originalHeight: '100%',
      originalWidth: '100vw'
    },
    // {
    //   original: 'https://i.imgur.com/RkNbhR0.jpeg',
    //   originalHeight: '100%',
    //   originalWidth: '70vw'
    // },
    {
      original: 'https://i.imgur.com/QM976FE.jpeg',
      originalWidth: '100vw'
    }
  ]

  class MyGallery extends React.Component {
    render() {
      return <ImageGallery items={images} showBullets={false} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} autoPlay={true}/>;
    }
  }

  return (
    <>
      <div className="logo">
        <img src="https://i.imgur.com/yEUfhhW.png" className="logo-for-home" />
      </div>
      <div className="landing-main">
        <h1 className="welcome-to">
          <span className="reveal-text">Welcome to</span>
          <br />
          <span className="reveal-text">Pet Care by Kubra & Zack!</span>
        </h1>
      </div>
      <MyGallery />
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


      {/* <div className="about-us">
        <h2 className="h2-about-us">About Us</h2>
        <p className="welcome-text">
          We, Kubra & Zack, are a married couple who love dogs and have turned
          that love into a dog walking business. We have been providing our
          services in Downtown Jersey City for more than 2 years. Our services
          include daily walks and boardings.
        </p>
      </div> */}