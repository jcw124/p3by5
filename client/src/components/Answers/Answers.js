import React from "react";
import { ButtonGroup, Button } from "reactstrap";
import "./Answers.css"; 
import "./../../utils/API/tempQuestions"

const Answers = props => {
  console.log("game answers 5: ", props);


  return (
    <div className="answerswrap">
       {/* <li className="answers">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          checked={props.answerType === props.answer}
          id={props.answerType}
          value={props.answerType}
          disabled={props.answer}
          onChange={props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={props.answerType}>
          {props.answerContent}
        </label>
      </li>  */}
        {/* <h5>Select Answer</h5>  */}
        <div className="answerList">
            <button className="answerbtn opt1" active="" onClick={this.onAnswerSelected}>  {props.answers[0]} </button>
            <button className="answerbtn opt2" active="" onClick={this.onAnswerSelected}>  {props.answers[1]}</button>
            <button className="answerbtn opt3" active="" onClick={this.onAnswerSelected}>  {props.answers[2]}</button>
            <button className="answerbtn opt4" active="" onClick={this.onAnswerSelected}>  {props.answers[3]} </button>
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
