import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Footer from "./footer";
import topicService from "../services/topicService";
import SocialIcons from "./socialIcon";
import auth from "../services/auth";
import userService from "../services/userService";

import "../assets/css/profile.css";

class AuthorProfile extends Component {
  state = {
    topics: [],
    user: {},
    users: [],
  };

  async componentDidMount() {
    this.fetchTopics();
    this.fetchUsers();
    this.fetchCurrUser();
  }

  async fetchUsers() {
    const { data: users } = await userService.getUsers();
    this.setState({ users });
  }

  async fetchCurrUser() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  fetchTopics = async () => {
    const { data: topics } = await topicService.getTopics();
    this.setState({ topics });
  };

  getAuthorTopics() {
    const { topics } = this.state;
    const authorId = this.props.match.params.id;

    return topics.filter((topic) => topic.author._id === authorId);
  }

  findAuthor() {
    const { topics, users } = this.state;
    const followerId = this.props.match.params.id;

    let author;
    topics.filter((topic) =>
      topic.author._id === followerId
        ? (author = topic.author)
        : users.filter((user) =>
            user._id === followerId ? (author = user) : null,
          ),
    );
    return author;
  }

  findFollowers() {
    const { users } = this.state;
    const followerId = this.props.match.params.id;

    return users.filter((user) => user._id === followerId);
  }

  render() {
    const authorTopics = this.getAuthorTopics();
    const author = this.findAuthor();
    return (
      <>
        <SocialIcons />

        <div className="profile-div">
          {author && (
            <div className="profile-grid-container">
              <div className="profile-grid-item">
                <p>
                  <strong>Full Name: </strong> {author.name}
                </p>
                <p>
                  <strong>Email: </strong> {author.email}
                </p>
                <p>
                  <strong>Publications: </strong>
                  {author ? author.publications : 0}
                </p>
                <p>
                  <strong>Followers: </strong>
                  {author.followers ? author.followers.length : 0}
                </p>
                <p>
                  <strong>Following: </strong>
                  {author.following ? author.following.length : 0}
                </p>
              </div>
              <div className="profile-img-grid-item">
                {author.imageUrl ? (
                  <img src={author.imageUrl} alt="user avatar" />
                ) : (
                  <i
                    className="fa fa-user-circle"
                    style={{ fontSize: "70px" }}
                  />
                )}
              </div>
            </div>
          )}
          <h2 id="author-profile-h2">
            {`${author && author.name}'s`} Publications
          </h2>
          <div className="grid-container profile-topics">
            {authorTopics
              ? authorTopics.map((topic) => (
                  <div key={topic._id} className="grid-item">
                    <div className="card">
                      <NavLink
                        to={
                          author
                            ? `/${topic.title}/${topic._id}`
                            : "/getstarted"
                        }
                      >
                        <img
                          style={{ width: "100%" }}
                          src={topic.imageUrl}
                          alt="programming avatar"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{topic.title}</h5>
                          <p className="card-text">
                            {`${topic.description
                              .split("")
                              .splice(0, 40)
                              .join("")}...`}
                          </p>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                ))
              : "This user haven't publish yet!"}
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default AuthorProfile;
