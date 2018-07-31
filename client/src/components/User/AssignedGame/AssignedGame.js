import React from "react";

export const AssignedGame = props => (
    <div className="container">
        <h3>Current Games</h3>
        <ul className="list-group-item">
            {props.children}
        </ul>
    </div>
);