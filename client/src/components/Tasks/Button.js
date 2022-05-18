import React from "react";
import PropTypes from "prop-types";

const Button = ({ color, text, OnClick, marginleft }) => {
  return (
    <button
      style={{ backgroundColor: color, marginLeft: marginleft }}
      className="btn"
      onClick={OnClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

Button.defaultProps = {
  color: "blue",
  text: "Add",
  marginleft: "5px",
};

export default Button;
