import React from "react";
import { NavLink } from "react-router-dom";

import "../assets/css/socialIcons.css";

const SocialIcons = () => {
  return (
    <div id="mySidenav" className="sidenav">
      <NavLink
        target="_blank"
        to={{
          pathname: "https://www.linkedin.com/in/mojib-mohammad/",
        }}
        id="linkedin"
      >
        <i className="fa fa-linkedin" />
      </NavLink>
      <NavLink
        target="_blank"
        to={{ pathname: "https://github.com/mojib2014" }}
        id="github"
      >
        <i className="fa fa-github" />
      </NavLink>
      <NavLink
        target="_blank"
        to={{ pathname: "https://codesandbox.io/u/mojib2014/sandboxes" }}
        id="codepen"
      >
        <i className="fa fa-codepen" />
      </NavLink>
      <NavLink
        target="_blank"
        to={{ pathname: "https://repl.it/@mojib2014" }}
        id="code"
      >
        <i className="fa fa-code" />
      </NavLink>
    </div>
  );
};

export default SocialIcons;
