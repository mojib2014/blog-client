import React from "react";
import PropTypes from "prop-types";

import "../../assets/css/fileinput.css";

const FileInput = ({ filename, onChange, onClick }) => {
  return (
    <div className="file-upload-div">
      <div className="custom-file">
        <input
          name={filename}
          onChange={onChange}
          type="file"
          className="custom-file-input"
          id="customFile"
        />
        <label className="custom-file-label" htmlFor="customFile">
          {filename}
        </label>
      </div>
      <input onClick={onClick} type="submit" value="Upload" />
    </div>
  );
};

FileInput.propTypes = {
  filename: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default FileInput;
