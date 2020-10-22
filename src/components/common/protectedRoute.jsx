import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import auth from "../../services/auth";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const [user, setUser] = useState({});
  const fetchCurrUser = async () => {
    const data = await auth.getCurrentUser();
    setUser(data);
  };

  useEffect(() => {
    fetchCurrUser();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
  render: PropTypes.func,
  rest: PropTypes.object,
};

export default ProtectedRoute;
