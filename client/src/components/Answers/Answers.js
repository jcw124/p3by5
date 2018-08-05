import React from "react";
import {
    ButtonGroup,
    Button
} from "reactstrap";



const Answers = props => (
    <div className="answers">
    <li className="answers">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
       // checked={props.answerType === props.answer}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={props.answerType}>
        {props.answerContent}
      </label>
    </li>


 


        {/* // <h5>Select Answer</h5> 
        //  <ButtonGroup>
        //     <Button color="primary" onClick="" active="">One</Button>
        //     <Button color="primary" onClick="" active="">Two</Button>
        //     <Button color="primary" onClick="" active="">Three</Button>
        //     <Button color="primary" onClick="" active="">Four</Button>
        // </ButtonGroup>
        // <p>Selected: {}</p> */}

    </div>


  );

  
  export default Answers;