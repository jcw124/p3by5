import React from "react";

//GameList render a list item 
export const GameList = props => (
    <div className="container">
        <h3>Current Games</h3>
        <ul className="list-group-item">
            {props.children}
        </ul>
    </div>
);