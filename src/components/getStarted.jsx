import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import Signup from "./signup";
import Footer from "./footer";
import userService from "../services/userService";
import auth from "../services/auth";
import http from "../services/httpService";

import "../assets/css/getStarted.css";

class GetStarted extends PureComponent {
  responseGoogle = async (res) => {
    http.setJwtToken(res.tokenId);
    const profileObj = res.profileObj;
    const user = {
      name: profileObj.name,
      username: profileObj.email,
      imageUrl: profileObj.imageUrl,
      googleId: profileObj.googleId,
    };
    try {
      const response = await userService.registerUser(user);
      const jwt = response.headers["x-auth-token"];
      auth.loginWithJwt(jwt);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data);
      }
    }

    window.location = "/";
  };

  onGoogleFail = (res) => {
    toast.error("Google Signup Failed", res);
  };

  responseFacebook = async (res) => {
    http.setJwtToken(res.signedRequest);

    try {
      const user = {
        name: res.name,
        username: res.email,
        imageUrl: res.picture.data.url,
        facebookId: res.userID,
      };

      const response = await userService.registerUser(user);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  componentClicked = () => {
    console.log("facebook button clicked");
  };

  render() {
    return (
      <>
        <div className="getstarted-div">
          <h3>Join M&M.</h3>
          <div className="google-btn">
            <GoogleLogin
              clientId={process.env.REACT_APP_G_CLIENT_ID}
              buttonText="Sign In With Google"
              onSuccess={this.responseGoogle}
            />
          </div>
          <div className="facebook-btn">
            <FacebookLogin
              appId={process.env.REACT_APP_F_APP_ID}
              fields="name,email,picture"
              onClick={this.componentClicked}
              callback={this.responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
            />
          </div>
          <Signup onSignup={this.handleEmailSignup} />
          <div className="already-have-account">
            <p>
              Already have an account?
              <Link className="account-signin" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default GetStarted;
