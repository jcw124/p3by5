import React from "react";
import {
    ButtonGroup,
    Button
} from "reactstrap";
import "./Answers.css"; 

const Answers = props => (
    <div className="answers">
        {/* <h5>Select Answer</h5> */}
        <div className="answerList">
            <button className="answerbtn opt1" active="">dkfgjnvifdnvlsidf idf oih foidh ioho oidsfh oih oofds</button>
            <button className="answerbtn opt2" active="">ihif ioehgiu ioiuio iounri</button>
            <button className="answerbtn opt3" active="">Three ijniu iu ihufgiu iuh gfhu</button>
            <button className="answerbtn opt4" active="">Four jhigu iuh uh ihiuhfg h </button>
        </div>
        {/* <p>Selected: {}</p> */}

    </div>

  );
  
  export default Answers;