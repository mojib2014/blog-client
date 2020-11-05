import React from "react";
import { NavLink } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import auth from "../../services/auth";
import Form from "../common/form";
import Footer from "../footer";
import FileInput from "../common/fileInput";
import topicService from "../../services/topicService";
import UserContext from "../../context/userContext";
import userService from "../../services/userService";
import http from "../../services/httpService";
import SocialIcons from "../socialIcon";

import "../../assets/css/topicForm.css";

class TopicForm extends Form {
  state = {
    data: { title: "", description: "" },
    file: null,
    uploadedFile: null,
    filename: null,
    user: {},
    errors: {},
  };

  schema = {
    title: Joi.string().min(5).required().label("Title"),
    description: Joi.string().min(5).required().label("Description"),
  };

  doSubmit = async () => {
    const { data, uploadedFile } = this.state;
    const user = await auth.getCurrentUser();
    const topic = {
      title: data.title,
      description: data.description,
      imageUrl: uploadedFile,
      author: user._id,
      createdAt: Date.now(),
    };
    try {
      user.publications++;
      http.setJwtToken(auth.getJwt());
      await userService.updateUser(user);
      await topicService.createTopic(topic);
      toast.info("successfully posted.");
    } catch (err) {
      toast.error(err.response.data);
    }
    // window.location = "/topics";
  };

  onFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
      uploaded: 0,
    });
  };

  onFileUpload = async (e) => {
    e.preventDefault();
    try {
      const file = new FormData();
      file.append("file", this.state.file);
      const { data } = await topicService.uploadTopicPhoto(file);
      this.setState({ uploadedFile: data });
      toast.info("Successfully uploaded.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  render() {
    const { filename } = this.state;
    return (
      <>
        <SocialIcons />
        <UserContext.Consumer>
          {(user) =>
            user && (
              <>
                <div className="topic-form-div">
                  <h1>Topic Form</h1>
                  <form onSubmit={this.handleSubmit}>
                    <FileInput
                      onChange={this.onFileChange}
                      onClick={this.onFileUpload}
                      filename={filename}
                    />
                    {this.renderInput("title", "Title", "text")}
                    <p>
                      Please format your comment with markdown.{" "}
                      <NavLink
                        id="markdown-cheat-sheet"
                        target="_blank"
                        to={{
                          pathname:
                            "https://www.markdownguide.org/cheat-sheet/",
                        }}
                      >
                        Markdwon Cheat Sheet.
                      </NavLink>
                    </p>
                    {this.renderTextArea(
                      "description",
                      "Description",
                      "Please format your comment with markdown.",
                      4,
                      "text",
                    )}
                    {this.renderButton("Submit")}
                  </form>
                </div>
                <Footer />
              </>
            )
          }
        </UserContext.Consumer>
      </>
    );
  }
}

export default TopicForm;
