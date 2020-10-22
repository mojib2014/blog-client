import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import topicService from "../../services/topicService";

import "../../assets/css/authorTopics.css";

const AuthorTopics = ({ match }) => {
  const [topics, setTopics] = useState([]);

  const fetchingTopics = async () => {
    const { data: topics } = await topicService.getTopics();
    setTopics(topics);
  };

  const getAuthorTopics = () => {
    return topics.filter((topic) => topic.author._id === match.params.id);
  };

  useEffect(() => {
    fetchingTopics();
  }, []);

  const authorTopics = getAuthorTopics();
  return (
    <div className="row authorTopics">
      {authorTopics.map((topic) => {
        return (
          <NavLink key={topic._id} to={`/${topic.title}/${topic._id}`}>
            <div
              key={topic._id}
              style={{ cursor: "pointer" }}
              className="column"
            >
              <div className="card">
                <div className="card-img-div">
                  <img
                    src={topic.imageUrl}
                    className="card-img-top"
                    alt="coding avatar"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{topic.title}</h5>
                  <p className="card-text">
                    {`${topic.description.split("").splice(0, 50).join("")}...`}
                  </p>
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default AuthorTopics;
