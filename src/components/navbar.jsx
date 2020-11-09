import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import UserContext from "../context/userContext";
import Notification from "./notifications";
import userService from "../services/userService";
import ProgressBar from "./progressBar";

import "../assets/css/navbar.css";

const Navbar = ({ searchQuery, onChange, user }) => {
  const [topnavClasses, setTopnavClasses] = useState("topnav");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleScroll();
    fetchingUsers();
    progressBar();
  }, []);

  const fetchingUsers = async () => {
    const { data } = await userService.getUsers();
    setUsers(data);
  };

  const findFollowers = () => {
    let followers = [];
    if (user) {
      for (let i = 0; i < users.length; i++) {
        if (user.followers.includes(users[i]._id)) {
          followers.push(users[i]);
        }
      }
    }

    return followers;
  };

  const handleSubscription = async () => {
    // await mailService.sendEmail(user);
  };

  const handleScroll = () => {
    window.addEventListener("scroll", () => {
      if (topnavClasses === "topnav" && window.scrollY > 100)
        setTopnavClasses("topnav sticky");
      else setTopnavClasses("topnav");
    });
  };

  const progressBar = () => {
    window.addEventListener("scroll", () => {
      const winScroll =
        window.scrollTop || window.document.documentElement.scrollTop;
      const height =
        window.document.documentElement.scrollHeight -
        window.document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      window.document.getElementById("myBar").style.width = scrolled + "%";
    });
  };

  const handleMobileNavToggle = () => {
    if (topnavClasses === "topnav")
      setTopnavClasses("topnav sticky responsive");
    else setTopnavClasses("topnav");
  };

  const followers = findFollowers();
  return (
    <UserContext.Consumer>
      {(user) => (
        <div className={topnavClasses}>
          <NavLink to="/topics">Mojib</NavLink>
          <NavLink to="/subscribe" onClick={handleSubscription}>
            Subscribe
          </NavLink>
          <NavLink to="/write">Write</NavLink>
          {!user && <NavLink to="/login">Sign in</NavLink>}
          {!user && <NavLink to="/getstarted">Get Started</NavLink>}
          {user && (
            <NavLink id="avatar-anchor" to="/profile">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="user avatar" />
              ) : (
                <i className="fa fa-user-circle" style={{ fontSize: "20px" }} />
              )}
            </NavLink>
          )}
          {user && <NavLink to="/logout">Logout</NavLink>}
          <Notification followers={followers} user={user} />
          <div className="search-container">
            <input
              name="search"
              type="text"
              value={searchQuery}
              placeholder="Search.."
              onChange={(e) => onChange(e)}
            />
          </div>
          <a
            href="#"
            style={{ fontSize: "20px" }}
            className="icon"
            onClick={handleMobileNavToggle}
          >
            &#9776;
          </a>
          <ProgressBar />
        </div>
      )}
    </UserContext.Consumer>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
  onChange: PropTypes.func,
  searchQuery: PropTypes.string,
};

export default Navbar;
