import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";

function ButtonInputButton({ formName }) {
  return (
    <div className="input-group mb-3">
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon1"
      >
        Button
      </button>
      <input
        type="text"
        className="form-control"
        placeholder=""
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
      >
        Button
      </button>
    </div>
  );
}

export default ButtonInputButton;
