import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import GetStarted from "./components/getStarted";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/logout";
import Navbar from "./components/navbar";
import RegisterForm from "./components/forms/registerForm";
import Topics from "./components/topics";
import TopicForm from "./components/forms/topicForm";
import TopicDetails from "./components/topicDetails/topicDetails";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import ProfileEditForm from "./components/forms/profileEditForm";
import ProtectedRoute from "./components/common/protectedRoute";
import AuthorTopics from "./components/topicDetails/authorTopics";
import Header from "./components/header";
import AuthorProfile from "./components/authorProfile";
import UserContext from "./context/userContext";
import auth from "./services/auth";

import "./assets/css/reset.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    searchQuery: "",
  };

  async componentDidMount() {
    const user = await auth.getCurrentUser();

    this.setState({ user });
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ searchQuery: input.value });
  };

  render() {
    const { user, searchQuery } = this.state;
    return (
      <UserContext.Provider value={user}>
        <ToastContainer />
        <Header />
        <Navbar
          user={user}
          onChange={this.handleChange}
          searchQuery={searchQuery}
        />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/getstarted" component={GetStarted} />
          <Route path="/profile" component={Profile} />
          <Route path="/author-profile/:id" component={AuthorProfile} />
          <ProtectedRoute path="/write" component={TopicForm} />
          <Route
            path="/topics"
            render={(props) => (
              <Topics {...props} searchQuery={searchQuery} user={user} />
            )}
          />
          <Route path="/author/:id" component={AuthorTopics} />
          <Route
            path="/users/:id"
            render={(props) => <ProfileEditForm {...props} user={user} />}
          />
          <Route
            path="/:title/:id"
            render={(props) => <TopicDetails {...props} user={user} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/topics" />
          <Redirect to="/not-found" />
        </Switch>
      </UserContext.Provider>
    );
  }
}

export default App;
