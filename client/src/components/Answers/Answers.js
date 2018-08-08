import React from "react";
import { ButtonGroup, Button } from "reactstrap";
import "./Answers.css"; 

const Answers = props => {
  console.log("answers 5: ", props);

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
            <button className="answerbtn opt1" onClick={this.walkright} active="">one </button>
            <button className="answerbtn opt2" active="">two</button>
            <button className="answerbtn opt3" active="">three</button>
            <button className="answerbtn opt4" active="">four </button>
        </div> 
         <p>Selected: {}</p> 

      {/* <h5>Select Answer</h5>
       <ButtonGroup>
        <Button color="primary" onClick="" active="false">
          {props.answers[0]}
        </Button>
        <Button color="primary" onClick="" active="false">
        {props.answers[1]}
        </Button>
        <Button color="primary" onClick="" active="false">
        {props.answers[2]}
        </Button>
        <Button color="primary"onClick="" active="false">
        {props.answers[3]}
        </Button>
      </ButtonGroup>
      <p>Selected: {}</p>  */}
    </div>
  );
};

export default Answers;
