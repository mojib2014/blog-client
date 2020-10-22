import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ name, label, placeholder, error, rows, ...rest }) => {
  return (
    <div className="form-group m-3">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        name={name}
        id={name}
        rows={rows}
        className="form-control"
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

TextArea.propTyeps = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
  rest: PropTypes.object,
};
export default TextArea;
