import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import topicService from "../../services/topicService";

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
    <div className="grid-container">
      {authorTopics.map((topic) => {
        return (
          <div key={topic._id} className="grid-item">
            <div className="card">
              <NavLink key={topic._id} to={`/${topic.title}/${topic._id}`}>
                <div className="card-img-container">
                  <img src={topic.imageUrl} alt="coding avatar" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{topic.title}</h5>
                  <p className="card-text">
                    {`${topic.description.split("").splice(0, 90).join("")}...`}
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuthorTopics;
