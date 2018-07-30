import React from "react";

export const HighScore = props => (
    <div className="container">
        <h3>Highscores</h3>
        <ul className="list-group-item">
            {props.children}
        </ul>
    </div>
);
