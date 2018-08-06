import React from "react";
import "./Questions.css"; 
import tempQuestions from './../../utils/API/tempQuestions';


function Questions(props) {
  console.log("line 7 props.questions:  ", props);
   return ( 
   <div className="questions">{props.content}

   </div>
  
  );
}

console.log("line 15 tempquestions: " , tempQuestions[0]);
console.log("line 16 questions: " , Questions);

  



export default Questions; 