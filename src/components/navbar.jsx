import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import topicService from "../services/topicService";
import UserContext from "../context/userContext";
import Notification from "./notifications";
import userService from "../services/userService";
import ProgressBar from "./progressBar";

import "../assets/css/navbar.css";

class Navbar extends React.Component {
  state = {
    scrolled: false,
    clicked: false,
    users: [],
  };

  componentDidMount() {
    this.handleScroll();
    this.fetchTopics();
    this.fetchingUsers();
    this.progressBar();
  }

  progressBar() {
    window.addEventListener("scroll", () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById("myBar").style.width = scrolled + "%";
    });
  }

  fetchTopics = async () => {
    const { data: topics } = await topicService.getTopics();
    this.setState({ topics });
  };

  async fetchingUsers() {
    const { data: users } = await userService.getUsers();
    this.setState({ users });
  }

  findFollowers() {
    const { user } = this.props;
    const { users } = this.state;

    let followers = [];
    if (user) {
      for (let i = 0; i < users.length; i++) {
        if (user.followers.includes(users[i]._id)) {
          followers.push(users[i]);
        }
      }
    }

    return followers;
  }

  handleScroll = () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100 && window.innerWidth > 700)
        this.setState({ scrolled: true });
      else if (window.scrollY < 100) this.setState({ scrolled: false });
    });
  };

  handleSubscription = async () => {
    this.setState({ clicked: !this.state.clicked });
    // await mailService.sendEmail(user);
  };

  handleToggle() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", window);
  }

  render() {
    const { onChange, searchQuery } = this.props;
    const followers = this.findFollowers();
    return (
      <UserContext.Consumer>
        {(user) => (
          <div
            id="myTopnav"
            className={this.state.scrolled ? "topnav sticky" : "topnav"}
          >
            <NavLink to="/topics">Mojib</NavLink>
            <NavLink to="/subscribe" onClick={this.handleSubscription}>
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
                  <i
                    className="fa fa-user-circle"
                    style={{ fontSize: "20px" }}
                  />
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
              onClick={this.handleToggle}
            >
              &#9776;
            </a>
            <ProgressBar />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object,
  onChange: PropTypes.func,
  searchQuery: PropTypes.string,
};

export default Navbar;
