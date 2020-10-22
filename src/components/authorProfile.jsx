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
            user._id === followerId ? (author = user) : null
          )
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
            <div className="profile-row">
              <div className="column-left">
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
              <div className="column-right profile-img-div">
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
          <div className="row topic-list-row profile-topics">
            <h2>{`${author && author.name}'s`} Publications</h2>
            {authorTopics
              ? authorTopics.map((topic) => (
                  <div key={topic._id} className="topic-list-column">
                    <NavLink
                      to={
                        author ? `/${topic.title}/${topic._id}` : "/getstarted"
                      }
                    >
                      <div className="card">
                        <div className="card-img-div">
                          <img src={topic.imageUrl} alt="programming avatar" />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{topic.title}</h5>
                          <p className="card-text">
                            {`${topic.description
                              .split("")
                              .splice(0, 40)
                              .join("")}...`}
                          </p>
                        </div>
                      </div>
                    </NavLink>
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
