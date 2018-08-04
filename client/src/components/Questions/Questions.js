import React from "react";
import "./Questions.css"; 
import tempQuestions from './../../utils/API/tempQuestions';


function Questions(props) {
   return ( 
    <div className="questions"> {props.content}</div>
  );
}

console.log("questions line 12 " + Questions);
console.log("line 13 questions: " + tempQuestions[0]);
  



export default Questions;