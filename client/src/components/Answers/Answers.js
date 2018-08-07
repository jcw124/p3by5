import React from "react";
import { ButtonGroup, Button } from "reactstrap";

const Answers = props => {
  console.log("answers 5: ", props);


  return (
    <div className="answers">
      <li className="answers">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          checked={props.answerType === props.correctAnswer}
          id={props.answerType}
          value={props.answerType}
          disabled={props.answer}
          onChange={props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={props.answerType}>
          {props.answerContent}
        </label>
      </li>









      {/* <ButtonGroup>
       <Button color="primary" onClick={this.onAnswerSelected} active="false">
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
      </ButtonGroup>
     <p>Selected: {}</p> */}
     </div> 
  );
  console.log("props.answerType : ", props.answerType);
  console.log("props.answer : ", props.answer);
  console.log("props.onAnswerSelected : ", props.onAnswerSelected);
  console.log("props.content : ", props.answerContent);

};

export default Answers;
