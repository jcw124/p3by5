import React from "react";
import "./Questions.css"; 
import tempQuestions from './../../utils/API/tempQuestions';




function Questions(props) {
   return ( 
    <div className="questions">{props.questions}</div>
  );
}


console.log("line 15 questions: " , tempQuestions[0]);
console.log("line 16 questions: " , Questions);
  



export default Questions; 