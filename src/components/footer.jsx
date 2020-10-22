import React from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/userContext";

const Footer = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <div className="footer" id="footer">
          <div className="footer-div">
            <div className="logo">
              <Link to="/">Mojib Mohammad</Link>
            </div>
            <div className="footer-links">
              <ul>
                <li>
                  <Link to="/subscribe">Subscribe</Link>
                </li>
                <li>
                  <Link to="/write">Write</Link>
                </li>
                {!user && (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                )}
                {!user && (
                  <li>
                    <Link to="/getstarted">Get started</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Footer;
