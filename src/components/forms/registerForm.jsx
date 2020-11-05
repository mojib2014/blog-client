import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Form from "../common/form";
import FileInput from "../common/fileInput";
import userService from "../../services/userService";
import auth from "../../services/auth";
import topicService from "../../services/topicService";

class RegisterForm extends Form {
  state = {
    data: { name: "", username: "", password: "" },
    file: null,
    uploadedFile: null,
    filename: null,
    errors: {},
  };

  schema = {
    name: Joi.string().min(5).max(20).required().label("Name"),
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).max(20).required().label("Password"),
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

  doSubmit = async () => {
    let { data: user, uploadedFile } = this.state;

    user = {
      name: user.name,
      username: user.username,
      password: user.password,
      imageUrl: uploadedFile,
      createdAt: Date.now(),
    };
    try {
      const response = await userService.registerUser(user);

      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.erros };
        errors.username = ex.response.data;
        toast.error(ex.response.data);

        this.setState({ errors });
      }
    }
  };

  render() {
    const { filename } = this.state;
    return (
      <div className="signup">
        <h1>Register Form</h1>
        <form>
          <FileInput
            onChange={this.onFileChange}
            onClick={this.onFileUpload}
            filename={filename}
          />
          {this.renderInput("name", "Name", "name")}
          {this.renderInput("username", "Username", "username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
