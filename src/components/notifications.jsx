import React, { Component } from "react";
import PropTypes from "prop-types";

import "../assets/css/notifications.css";

class Notifications extends Component {
  render() {
    const { followers } = this.props;
    return (
      <div className="dropdown">
        <button className="dropbtn">
          <i className="fa fa-bell" />
          <span>{followers.length}</span>
        </button>
        <div className="dropdown-content">
          {followers.map((follower) => (
            <a key={follower._id} href={`/author-profile/${follower._id}`}>
              {follower.name} Followed you.
            </a>
          ))}
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  followers: PropTypes.array,
};

export default Notifications;
