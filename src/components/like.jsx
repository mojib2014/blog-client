import React from "react";
import PropTypes from "prop-types";

import "../assets/css/like.css";

const Like = ({ item, onLike }) => {
  const getLikesClasses = () => {
    let classes = "fa fa-";

    if (item.liked === true) {
      return (classes += "heart");
    }
    return (classes += "heart-o");
  };

  return (
    <div className="likes column side">
      <div className="like-icon-div">
        <i
          style={{ cursor: "pointer", fontSize: "40px" }}
          onClick={onLike}
          className={getLikesClasses()}
        ></i>
        <span>{item.likesCount}</span>
      </div>
    </div>
  );
};

Like.propTypes = {
  item: PropTypes.object,
  onLike: PropTypes.func,
};

export default Like;
