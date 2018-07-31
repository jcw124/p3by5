import React from "react";

//GameList render a list item 
export const List = ({ children }) => (
    <div className="list-overflow-container">
        <ul className="list-group-item">
            {children}
        </ul>
    </div>
);