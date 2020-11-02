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
import SocialIcons from "../socialIcon";

import "../../assets/css/topicForm.css";

class TopicForm extends Form {
  state = {
    data: { title: "", description: "" },
    file: null,
    uploadedFile: null,
    filename: "Chose File",
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
      imageUrl: uploadedFile.filepath,
      author: user._id,
      createdAt: Date.now(),
    };
    try {
      user.publications++;
      await userService.updateUser(user);
      await topicService.createTopic(topic);
    } catch (err) {
      toast.info(err.response.data);
    }
    window.location = "/topics";
  };

  changeHandler = (e) => {
    e.preventDefault();
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
      loaded: 0,
    });
  };

  handlefileUpload = async (e) => {
    e.preventDefault();
    try {
      const file = new FormData();
      file.append("file", this.state.file);
      const { data } = await topicService.uploadTopicPhoto(file, {
        headers: {
          "Conent-type": "multipart/form-data",
        },
      });
      this.setState({
        uploadedFile: {
          filename: data.filename,
          filepath: data.filepath,
        },
      });
      toast.success("Successfuly uploaded");
    } catch (err) {
      if (err.response && err.response.status === 500) {
        toast.error("Something failed");
      } else {
        toast.error(err.response.data.msg);
      }
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
                      onClick={this.handlefileUpload}
                      onChange={this.changeHandler}
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
