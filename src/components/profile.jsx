import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import moment from "moment";

import Footer from "./footer";
import topicService from "../services/topicService";
import UserContext from "../context/userContext";
import SocialIcons from "./socialIcon";

import "../assets/css/profile.css";

const Profile = () => {
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    const { data } = await topicService.getTopics();
    setTopics(data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      <SocialIcons />
      <UserContext.Consumer>
        {(user) => (
          <>
            <div className="profile-div">
              {user && (
                <>
                  <div className="profile-row">
                    <div className="column-left">
                      <p>
                        <strong>Full Name: </strong> {user.name}
                      </p>
                      <p>
                        <strong>Email: </strong> {user.email}
                      </p>
                      <p>
                        <strong>Publications: </strong> {user.publications}
                      </p>
                      <p>
                        <strong>Followers: </strong> {user.followers.length}
                      </p>
                      <p>
                        <strong>Following: </strong> {user.following.length}
                      </p>
                      <p>
                        <strong>Updated At: </strong>
                        {moment(Date.parse(user.updatedAt)).fromNow()}
                      </p>
                    </div>
                    <div className="column-right profile-img-div">
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt="user avatar" />
                      ) : (
                        <i
                          className="fa fa-user-circle"
                          style={{ fontSize: "70px" }}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className="edit-profile-btn"
                  >
                    <NavLink to={`/users/${user._id}`}>Edit Profile</NavLink>
                  </div>
                  <div className="row topic-list-row profile-topics">
                    <h2>Your Publications</h2>
                    {topics
                      .filter((topic) => topic.author._id === user._id)
                      .map((topic) => (
                        <div key={topic._id} className="topic-list-column">
                          <Link
                            to={
                              user
                                ? `/${topic.title}/${topic._id}`
                                : "/getstarted"
                            }
                          >
                            <div className="card">
                              <div className="card-img-div">
                                <img
                                  src={topic.imageUrl}
                                  alt="programming avatar"
                                />
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
                          </Link>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
            <Footer />
          </>
        )}
      </UserContext.Consumer>
    </>
  );
};

export default Profile;
