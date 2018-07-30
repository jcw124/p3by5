import React from "react";
import "./DisplayGame.css";

export const DisplayGameQA = props => (
    <div className="displaygameqa">
        <h3>Current Questions and Answers</h3>
        <ul className="list-group-item">
            {props.children}
        </ul>
    </div>
);