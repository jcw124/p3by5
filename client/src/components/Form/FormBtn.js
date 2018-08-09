import React from "react";
import "./Form.css";

export const FormBtn = props => (
  <button style={{ float: "right", marginBottom: 10 }} {...props} className="btn btn-success mx-auto">
    {props.children}
  </button>
);
