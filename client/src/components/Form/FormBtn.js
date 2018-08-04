import React from "react";

export const FormBtn = ({click}) => (
  <button style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
    onClick={click}
  </button>
);
