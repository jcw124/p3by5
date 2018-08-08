import React from "react";
import { ButtonGroup, Button } from "reactstrap";
import "./Answers.css"; 
import "./../../utils/API/tempQuestions"

const Answers = (props) => {
  console.log("Answer props: ", props);


  return (
    <div className="answerswrap">
        {/* <h5>Select Answer</h5>  */}
        <div className="answerList"> 
            <button className="answerbtn opt1"  onClick={props.onAnswerSelected} value={props.answers[0]}>{props.answers[0]} </button>
            <button className="answerbtn opt2" active="" onClick={props.onAnswerSelected} value={props.answers[1]}>  {props.answers[1]}</button>
            <button className="answerbtn opt3" active="" onClick={props.onAnswerSelected} value={props.answers[2]}>  {props.answers[2]}</button>
            <button className="answerbtn opt4" active="" onClick={props.onAnswerSelected} value={props.answers[3]}>  {props.answers[3]} </button>
        </div>    
          {/* <p>Selected: {}</p>  */}

    



    {/* <ButtonGroup>
    <Button color="primary" onClick={this.onAnswerSelected} active="false">
    <h5>Select Answer</h5> */}
     {/* <ButtonGroup>
         <Button color="primary" onClick="" active="false">
           {props.answers[0]}
         </Button>
       <Button color="primary" onClick="" active="false">
          {props.answers[1]}
        </Button>
       {props.answers[2]}
         </Button>
          <Button color="primary"onClick="" active="false">
        {props.answers[3]}
         </Button>
       </ButtonGroup> */}
      {/* <p>Selected: {}</p>  */}
      </div>

 );
  console.log("props.answerType : ", props.answerType);
  console.log("props.answer : ", props.answer);
  console.log("props.onAnswerSelected : ", props.onAnswerSelected);
  console.log("props.content : ", props.answerContent);

};

export default Answers;
