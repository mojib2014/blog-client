import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// import mailService from "../services/mailService";

const Subscribe = ({ user }) => {
  const handleSubscription = async () => {
    // await mailService.sendEmail(user);
  };
  return (
    <div>
      {user ? (
        <NavLink onClick={handleSubscription} to="/subscribe">
          Subscribe
        </NavLink>
      ) : (
        "not user"
      )}
    </div>
  );
};

Subscribe.propTypes = {
  user: PropTypes.object,
};

export default Subscribe;
