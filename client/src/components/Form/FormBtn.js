import React from "react";

export const FormBtn = ({ click, text, disabled }) => (
  <button style={{ float: "right", marginBottom: 10 }} onClick={click} disabled={disabled} className="btn btn-success">
    {text}
  </button>
);
