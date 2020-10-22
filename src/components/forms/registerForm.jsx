import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Form from "../common/form";
import FileInput from "../common/fileInput";
import userService from "../../services/userService";
import auth from "../../services/auth";

class RegisterForm extends Form {
  state = {
    data: { name: "", username: "", password: "" },
    file: null,
    uploadedFile: null,
    filename: "Chose File",
    errors: {},
  };

  schema = {
    name: Joi.string().min(5).max(20).required().label("Name"),
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).max(20).required().label("Password"),
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
      const { data } = await userService.uploadUserImage(file, {
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

  doSubmit = async () => {
    let { data: user, uploadedFile } = this.state;

    user = {
      name: user.name,
      username: user.username,
      password: user.password,
      imageUrl: uploadedFile ? uploadedFile.filepath : "",
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
        <h1>Sign up</h1>
        <form>
          <FileInput
            onChange={this.changeHandler}
            onClick={this.handlefileUpload}
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
