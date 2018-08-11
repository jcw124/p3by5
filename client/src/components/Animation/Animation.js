import React from "react";
import "./Animation.css";
import logosm from "../../images/badge.svg";

// function walkright() {
//     document.getElementById("#teacher").classList.toggle("walk");
// };

const Animation = props => (
    // <div>
    // <div style={{padding: 20 + 'px'}}> <button id="moveleft">Move Left</button>  <button  onClick={walkright} id="moveright">Move right</button> <button id="movedown">Move Down</button> <button id="moveup">Move Up</button></div>
    // </div>
    <div className="AnimationContainer">  
        <div className="teacherContainer">
            <div id="teacher" className="dont-walk"></div>
        </div>
        <div className="gamebadge"><img alt="badge" src={logosm} /></div>
        <div className="userContainer">
            <div id="user" className="dont-walk"></div>
        </div>
    </div>

  );

export default Animation;

