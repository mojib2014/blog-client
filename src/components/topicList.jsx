import React from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

import SocialIcons from "./socialIcon";

import "../assets/css/topicList.css";

const TopicList = ({ items, user, searchQuery }) => {
  let filtered = items;
  if (searchQuery) {
    filtered = items.filter((item) =>
      item.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
    );
  }
  return (
    <>
      <SocialIcons />
      <div className="grid-container topic-list">
        {filtered.map((item) => {
          return (
            <div key={item._id} className="grid-item">
              <div className="card">
                <NavLink
                  key={item._id}
                  to={user ? `/${item.title}/${item._id}` : "/getstarted"}
                >
                  <img
                    style={{ width: "100%" }}
                    src={item.imageUrl}
                    alt="programming avatar"
                  />
                </NavLink>
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <ReactMarkdown
                    className="card-text"
                    source={`${item.description
                      .split("")
                      .splice(0, 90)
                      .join("")}...`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

TopicList.propTypes = {
  items: PropTypes.array,
  user: PropTypes.object,
  searchQuery: PropTypes.string,
};

export default TopicList;
