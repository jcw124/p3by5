//import React from "react";
import React, { Component } from "react";
import "./Questions.css";
import data from "./Questions.json";
import {
  ButtonGroup,
  Button
} from "reactstrap";

class Questions extends Component {
  // constructor(props) {
  //   super(props);
    state = {
      data: [{}]
    };
  // }

  componentDidMount() {
    this.setState({ data: data });
  }

  handleclick = (answerid, questionid) => {
    if (
      data[questionid].correctAnswer ===
      data[questionid].possibleAnswers[answerid]
    ) {
      console.log("You are Correct");
    } else {
      console.log("You are Incorrect");
    }
  };

  render() {
    return (
      <div>
        <div className="questions" />
    
        {this.state.data.map(item => {
          return (
            <div className="questiondisplay">
              <p>{item.question}</p>
              
                <div>
                 {/* {this.state.data.possibleAnswers.map((subitem, i) => {
        return ( */}
                  <ul>
                 
                    {
                      item &&
                    item.possibleAnswers &&
                    item.possibleAnswers.map((e, i)=>(<button color="primary" onClick="{this.handleclick()}" key={i}>{e}</button>))
                    }

                  {/* {JSON.stringify (item.possibleAnswers, null, 2)} */}
                    {/* <li onclick={this.handleclick(0, 0)}>
                      {item.possibleAnswers[0]}
                    </li>
                    <li onclick={this.handleclick(1, 0)}>
                      {item.possibleAnswers[1]}
                    </li>
                    <li onclick={this.handleclick(2, 0)}>
                      {item.possibleAnswers[2]}
                    </li>
                    <li onclick={this.handleclick(3, 0)}>
                      {item.possibleAnswers[3]}
                    </li> */}
                  </ul>
                     {/* }) */}
                  
                </div>
              
            </div>
          );
        })}
        {/* correct */}
      </div>
    );
  }
}

const Answers = props => (
  <div className="answers">
      <h5>Select Answer</h5>
      <ButtonGroup>
          <Button color="primary" onClick="" active="">One</Button>
          <Button color="primary" onClick="" active="">Two</Button>
          <Button color="primary" onClick="" active="">Three</Button>
          <Button color="primary" onClick="" active="">Four</Button>
          <Button color="primary" onClick="" active="">Four</Button>
      </ButtonGroup>
      <p>Selected: {}</p>

  </div>

);

export default Questions;

//pull 10 questions and answers from the quiz db

// randomize questions selected if more than the number required exist in the db.

//this.question, this.choices, this.answer

// list.map((item, index) => {
//   return (
//     <div key={index}>
//       <ul >{item.value}</ul>
//      {
//       item.list.map((subitem, i) => {
//         return (
//            <ul ><li>{subitem.value}</li></ul>
//         )
//       })
//      }
//     </div>
//   )
// }
