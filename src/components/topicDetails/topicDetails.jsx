import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import Author from "../author";
import Footer from "../footer";
import Like from "../like";
import topicService from "../../services/topicService";
import CommentForm from "../forms/commentForm";
import Comments from "../comments";

import "../../assets/css/topicDetails.css";
import httpService from "../../services/httpService";
import auth from "../../services/auth";

class TopicDetails extends Component {
  state = {
    topics: [],
    selectedTopic: {},
  };

  async componentDidMount() {
    this.fetchingTopics();
  }

  async fetchingTopics() {
    const { user } = this.props;
    try {
      httpService.setJwtToken(auth.getJwt());
      const { data: topics } = await topicService.getTopics();
      topics.map(async function (topic) {
        if (user && !topic.likedBy.includes(user._id)) {
          topic.liked = false;
          return await topicService.updateTopic(topic);
        }
      });
      this.setState({ topics });
    } catch (err) {
      toast.info(err.response.data);
    }
  }

  handleLike = (item) => {
    const { topics } = this.state;
    const { user } = this.props;

    topics.map(async function (topic) {
      topic.liked = !topic.liked;

      if (user && topic._id === item._id && topic.liked === true) {
        topic.likedBy.push(user._id);
        topic.likesCount++;
      }

      if (topic.liked === false && topic.likedBy.includes(user._id)) {
        topic.likedBy.splice(topic.likedBy.indexOf(user._id), 1);

        topic.likesCount--;
      }

      try {
        await topicService.updateTopic(topic);
      } catch (err) {
        toast.info(err.response.data);
      }
    });

    this.setState({ topics });
  };

  getSelectedTopic = () => {
    const id = this.props.match.params.id;
    const topics = this.state.topics;
    let item;
    for (let topic of topics) {
      if (topic._id === id) item = topic;
    }
    return item;
  };
  render() {
    const item = this.getSelectedTopic();
    return (
      <>
        {item ? (
          <>
            <div className="row topic-detail-row">
              <Author item={item} user={this.props.user} />
              <div className="column middle">
                <div className="topic-description">
                  <h1>{item.title}</h1>
                  <div className="topic-img-container">
                    <img src={item.imageUrl} alt={`${item.title} avatar`} />
                  </div>
                  <ReactMarkdown
                    className="markdown-description"
                    source={item.description}
                  />
                </div>
              </div>
              <Like
                item={item}
                onStars={() => this.handleStars(item)}
                onLike={() => this.handleLike(item)}
              />
            </div>
            <div className="read-more-paragraph">
              <p>
                Read more
                <NavLink to={`/author/${item.author._id}`}> posts </NavLink>
                by this author
              </p>
            </div>
          </>
        ) : (
          <p>There are no topics to show</p>
        )}
        <CommentForm item={item} />
        <Comments item={item} />
        <Footer />
      </>
    );
  }
}

TopicDetails.propTypes = {
  user: PropTypes.object,
};

export default TopicDetails;
