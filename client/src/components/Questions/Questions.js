import React from "react";
import "./Questions.css"; 
import tempQuestions from './../../utils/API/tempQuestions';


function Questions(props) {
   return ( 
   <div className="questions">question: {props.question}
   </div>
  
  );
}

console.log("line 15 tempquestions: " , tempQuestions[0]);
console.log("line 16 questions: " , Questions);
console.log("line 17 props.questions: " )
  



export default Questions; 