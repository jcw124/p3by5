import React from "react";
import "./Questions.css"; 
import tempQuestions from './../../utils/API/tempQuestions';
import "./Questions.css";
import teacherProfile from "../../images/teacherprofile.svg";


function Questions(props) {
     return ( 
  <div className="questionContainer">
    <div className="teacher">
        <img alt="teacher_icon" src={teacherProfile} />
    </div>
    <div className="mainQuestion">
    <div className="questions">{props.content}
    </div>
    </div>
  </div>
  

  );
 }

export default Questions; 