import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import Form from "../common/form";
import Footer from "../footer";
import FileInput from "../common/fileInput";
import userService from "../../services/userService";

import "../../assets/css/profileEdit.css";

class ProfileEditForm extends Form {
  state = {
    data: { name: "", username: "" },
    file: null,
    uploadedFile: null,
    filename: "Chose File",
    errors: {},
  };

  schema = {
    name: Joi.string().min(5).required().label("Name"),
    username: Joi.string().email().required().label("Username"),
  };

  async componentDidMount() {
    await this.populateUser();
  }

  async populateUser() {
    const userId = this.props.match.params.id;
    if (userId === "new") return;

    const { data: user } = await userService.getUser(userId);

    if (!user) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(user) });
  }

  mapToViewModel(user) {
    return {
      name: user.name,
      username: user.email,
    };
  }

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
    const { data, uploadedFile } = this.state;
    const { user } = this.props;
    if (user) {
      const updated = {
        name: data.name,
        email: data.username,
        imageUrl: uploadedFile ? uploadedFile.filepath : "",
        _id: user._id,
        updatedAt: Date.now(),
      };
      try {
        await userService.updateUser(updated);
        window.location = "/topics";
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const { filename } = this.state;
    return (
      <>
        <div className="profile-edit-form">
          <h1>Profile Edit Form</h1>
          <form>
            <FileInput
              onChange={this.changeHandler}
              onClick={this.handlefileUpload}
              filename={filename}
            />
            {this.renderInput("name", "Name", "name")}
            {this.renderInput("username", "Username", "username")}
            {this.renderButton("Save")}
          </form>
        </div>
        <Footer />
      </>
    );
  }
}

ProfileEditForm.propTypes = {
  user: PropTypes.object,
};

export default ProfileEditForm;
