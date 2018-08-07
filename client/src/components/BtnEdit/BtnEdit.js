import React from "react";

const BtnEdit = ({ click, id }) => (
    <button
        id={id}
        onClick={click}
        className="edit-btn btn-primary">
        Edit
        </button>
);

export default BtnEdit;