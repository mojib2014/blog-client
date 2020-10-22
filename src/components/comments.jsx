import React, { Component } from "react";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

import commentService from "../services/commentService";
import auth from "../services/auth";

import "../assets/css/comments.css";

class Comments extends Component {
  state = {
    comments: [],
    isVoted: false,
  };

  componentDidMount() {
    this.fetchingComments();
    this.fetchCurrentUser();
  }

  async fetchCurrentUser() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  fetchingComments = async () => {
    const { data: comments } = await commentService.getComments();
    this.setState({ comments });
  };

  toggleIsVoted() {
    this.setState({ isVoted: !this.state.isVoted });
  }

  async handleUpVote(comment) {
    const { comments, isVoted } = this.state;
    this.setState({ isVoted: true });
    try {
      if (isVoted === true) {
        comments.filter((c) => (c._id === comment._id ? c.upvotes++ : null));
        this.setState({ comments, isVoted: false });
        await commentService.upvote(comment);
      }
      if (isVoted === false) {
        comment.filter((c) => (c._id === comment._id ? c.upvotes-- : null));
        this.setState({ comments });
        await commentService.upvote(comment);
      }
    } catch (err) {
      console.log(err.response);
    }
  }

  async handleDownVote(comment) {
    const { comments } = this.state;
    try {
      comments.filter((c) =>
        c._id === comment._id ? (c.downvotes += 1) : null,
      );
      this.setState({ comments });
      await commentService.downvote(comment);
    } catch (err) {
      console.log(err.response);
    }
  }

  async handleDelete(comment) {
    const originalComments = this.state.comments;
    const { user } = this.state;
    try {
      if (user && user._id === comment.user._id) {
        this.setState({
          comments: this.state.comments.filter((c) => c._id !== comment._id),
        });
        await commentService.deleteComment(comment);
      }
    } catch (err) {
      console.log(err.response.data);
      this.setState({ comments: originalComments });
    }
  }

  render() {
    const { comments, user } = this.state;
    const { item } = this.props;
    return (
      <div id="comments-wrapper">
        {comments.map((comment) => (
          <div key={comment._id}>
            {item && item._id === comment.topic ? (
              <>
                <div className="comments">
                  <div className="comment-details">
                    <div className="user-avatar">
                      <img src={comment.user.imageUrl} alt="user avatar" />
                    </div>
                    <div>
                      <h4>{comment.user.name}</h4>
                    </div>
                    <div className="createdAt">
                      {moment(Date.parse(comment.createdAt)).fromNow()}
                    </div>
                  </div>
                </div>
                <div className="comment">
                  <ReactMarkdown>{comment.comment}</ReactMarkdown>
                </div>
                {user && user._id === comment.user._id ? (
                  <div className="delete-btn">
                    <button onClick={() => this.handleDelete(comment)}>
                      Delete
                    </button>
                  </div>
                ) : null}
                <div className="votes">
                  <div className="vote">
                    <span>
                      {comment.upvotes}
                      <i
                        onClick={() => this.handleUpVote(comment)}
                        className="fa fa-arrow-up"
                      />
                    </span>
                    <span>
                      <i
                        onClick={() => this.handleDownVote(comment)}
                        className="fa fa-arrow-down"
                      />
                      {comment.downvotes}
                    </span>
                    <span id="reply">
                      <a href="/topic-form">Reply</a>
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

Comments.propTypes = {
  item: PropTypes.object,
};

export default Comments;
