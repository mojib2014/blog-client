import React, { Component } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import followingService from "../services/followingService";

import "../assets/css/author.css";

class Author extends Component {
  handleFollow = async (author) => {
    const { user } = this.props;
    author.isFollowing = !author.isFollowing;

    if (user && author.isFollowing === true) {
      if (user._id === author._id) return null;
      try {
        this.setState({ author });
        await followingService.follow(user, author);
      } catch (err) {
        toast.info(err.response.data);
      }
    }

    if (user && author.isFollowing === false) {
      if (user._id === author._id) return null;
      try {
        this.setState({ author });
        await followingService.unfollow(user, author);
      } catch (err) {
        toast.info(err.response.data);
      }
    }
  };

  render() {
    const author = this.props.item.author;
    return (
      <>
        {author ? (
          <>
            <div className="author-grid-item author">
              <NavLink to={`/author-profile/${author._id}`} id="author-link">
                <img src={author.imageUrl} alt="author avatar" />
                <p style={{ marginBottom: "3px" }}>{author.name}</p>
                {`@${
                  author.email
                    ? author.email
                        .split("")
                        .splice(0, author.email.indexOf("@"))
                        .join("")
                    : null
                }`}

                <p>{`publications: ${author.publications}`}</p>
                <p>{`Followers: ${
                  author.followers ? author.followers.length : 0
                }`}</p>
                <p>{`following: ${
                  author.following ? author.following.length : 0
                }`}</p>
              </NavLink>
              <div className="follow-btn">
                <button onClick={() => this.handleFollow(author)}>
                  {author.isFollowing === true ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}

Author.propTypes = {
  user: PropTypes.object,
  item: PropTypes.object,
};

export default Author;
