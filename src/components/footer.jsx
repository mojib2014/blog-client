import React from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/userContext";

import "../assets/css/footer.css";

const Footer = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <>
          <div className="grid-container footer" id="footer">
            <div className="grid-item logo">
              <Link style={{ color: "rgb(128, 126, 126)" }} to="/">
                Mojib Mohammad
              </Link>
            </div>
            <div className="grid-item">
              <Link to="/subscribe">Subscribe</Link>
            </div>
            <div className="grid-item">
              <Link to="/write">Write</Link>
            </div>
            <div className="grid-item">
              {!user && <Link to="/login">Login</Link>}
            </div>
            <div className="grid-item">
              {!user && <Link to="/getstarted">Get started</Link>}
            </div>
          </div>
          <div id="copyright" className="copyright-grid-container">
            <div className="grid-item">
              <span role="img" aria-label="made with love">
                Copyright © 2020 Mojib Mohammad ♥️
              </span>
            </div>
          </div>
        </>
      )}
    </UserContext.Consumer>
  );
};

export default Footer;
