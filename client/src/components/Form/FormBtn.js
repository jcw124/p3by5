import React from "react";

export const FormBtn = ({ addQuestion }) => (
  <button style={{ float: "right", marginBottom: 10 }} onClick={addQuestion} className="btn btn-success">
    Add Question
  </button>
);
