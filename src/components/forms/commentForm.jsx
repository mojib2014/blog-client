import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import Form from "../common/form";
import commentService from "../../services/commentService";
import auth from "../../services/auth";
import http from "../../services/httpService";

import "../../assets/css/commentForm.css";

class CommentForm extends Form {
  state = {
    data: { comment: "" },
    errors: {},
    user: {},
  };

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  schema = {
    comment: Joi.string().min(10).required().label("Comment"),
  };

  doSubmit = async () => {
    const { user, data } = this.state;
    const { item: topic } = this.props;
    if (user) {
      try {
        const comment = {
          comment: data.comment,
          user: user._id,
          createdAt: Date.now(),
          topic: topic._id,
        };
        http.setJwtToken(await auth.getCurrentUser());
        await commentService.createComment(comment);
        toast.info("Successefully posted.");
        window.location = `/${topic.title}/${topic._id}`;
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.comment = ex.response.data;

          this.setState({ errors });
        }
      }
    }
  };
  render() {
    return (
      <div className="comment-form-div">
        {this.renderTextArea(
          "comment",
          "Comment",
          "Please format your comment with markdown.",
          5,
          "comment",
        )}
        {this.renderButton("Post")}
      </div>
    );
  }
}

CommentForm.propTypes = {
  topic: PropTypes.object,
};

export default CommentForm;
