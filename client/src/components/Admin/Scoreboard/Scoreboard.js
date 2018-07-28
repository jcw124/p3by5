import React from "react";

export const Scoreboard = props => (
    <div className="container">
        <h3>Student Progress</h3>
        <ul className="list-group-item">
            {props.children}
        </ul>
    </div>
);
