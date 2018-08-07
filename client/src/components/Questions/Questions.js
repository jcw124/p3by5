import React from "react";
import "./Questions.css"; 
import tempQuestions from './../../utils/API/tempQuestions';
import "./Questions.css";
import teacherProfile from "../../images/teacherprofile.svg";


function Questions(props) {
  console.log("line 7 props.questions:  ", props);
   return ( 
   <div className="questions">{props.content}
   </div>
  


// const Questions = props => (
//     <div className="questionContainer">
//       <div className="teacher">
//         <img alt="teacher_icon" src={teacherProfile} />
//       </div>
//       <div className="mainQuestion">
//         <div className="questions">
//           This is a place holder for a question
//         </div>
//       </div>
//     </div>
  );
 }

console.log("line 15 tempquestions: " , tempQuestions[0]);
console.log("line 16 questions: " , Questions);

  



export default Questions; 