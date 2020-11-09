import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import Footer from "./footer";
import TopicList from "./topicList";
import topicService from "../services/topicService";

import "../assets/css/topic.css";

class Topics extends Component {
  state = {
    topics: [],
    selectedTopic: {},
  };

  componentDidMount() {
    this.fetchingTopics();
  }

  async fetchingTopics() {
    try {
      const { data: topics } = await topicService.getTopics();
      this.setState({ topics });
    } catch (ex) {
      toast.error(ex.message);
    }
  }

  render() {
    const { topics } = this.state;
    const { user, searchQuery } = this.props;
    return (
      <div className="topic-container">
        <h1 id="topics-heading">Dive on topics that matter to you.</h1>
        <TopicList searchQuery={searchQuery} user={user} items={topics} />
        {!user && (
          <div id="getstarted-btn">
            <button>
              <Link to="/getstarted">Get Started</Link>
            </button>
            <p>
              Already have an account<Link to="/signin"> Sign in</Link>
            </p>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

Topics.propTypes = {
  user: PropTypes.object,
  searchQuery: PropTypes.string,
};

export default Topics;
