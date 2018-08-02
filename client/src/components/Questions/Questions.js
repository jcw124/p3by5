import React from "react";
import "./Questions.css"; 


const Questions = props => (
    <div>
      <div className="questions">
      {props.content}
      </div>
    </div>
  );
  
  export default Questions;