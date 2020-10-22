import React from "react";
import { Link } from "react-router-dom";

import "../assets/css/signup.css";

const Signup = () => {
  return (
    <div className="signup-div">
      <i className="fa fa-envelope"></i>
      <Link to="/register">Sign up with Email</Link>
    </div>
  );
};

export default Signup;
