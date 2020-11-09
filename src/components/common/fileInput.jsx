import React from "react";
import PropTypes from "prop-types";

import "../../assets/css/fileinput.css";

const FileInput = ({ filename, onChange, onClick }) => {
  return (
    <div className="file-upload-container">
      <div className="custom-file">
        <input
          onChange={onChange}
          name={filename}
          type="file"
          className="custom-file-input"
          id="customFile"
          placeholder="Chose an image"
        />
        <label className="custom-file-label" htmlFor="customFile">
          {filename}
        </label>
      </div>
      <div className="button-div">
        <button disabled={!filename} onClick={onClick}>
          Upload
        </button>
      </div>
    </div>
  );
};

FileInput.propTypes = {
  filename: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default FileInput;
