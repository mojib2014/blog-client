import React from "react";
import Joi from "joi-browser";

import auth from "../../services/auth";
import Form from "../common/form";
import Footer from "../footer";

import "../../assets/css/login.css";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).max(20).required().label("Password"),
  };

  doSubmit = async () => {
    const { username: email, password } = this.state.data;
    try {
      await auth.login(email, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <>
        <div className="signin">
          <h1>Sign in</h1>
          <form>
            {this.renderInput("username", "Username", "username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Sign in")}
          </form>
        </div>
        <Footer />
      </>
    );
  }
}

export default LoginForm;
