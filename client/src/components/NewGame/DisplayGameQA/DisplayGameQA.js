import React from "react";

export const DisplayGameQA = props => (
    <div className="container">
        <h3>Current Questions and Answers</h3>
        <ul className="list-group-item">
            {props.children}
        </ul>
    </div>
);