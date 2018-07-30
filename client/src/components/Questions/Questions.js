//import React from "react";
import React, { Component } from "react";
import "./Questions.css";
import data from "./Questions.json";


class Questions extends Component {
  state = {
    data: [{}]
  };

  
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
        <div className="questions">
          This is the Questions Componenet
          {this.state.data.map(item => (
            
      <div>
              <div>{item.question}</div>
              <ul>
                <li onclick={this.handleclick(0, 0)}>
                {item.possibleAnswers[0]}
                </li>
                {/* <li onclick={this.handleclick(1, 0)}>
                  {item.possibleAnswers[1]}
                </li>
                <li onclick={this.handleclick(2, 0)}>
                  {item.possibleAnswers[2]}
                </li>
                <li onclick={this.handleclick(3, 0)}>
                  {item.possibleAnswers[3]} */} 
                {/* </li> */}
              </ul>
            </div>
    )
          )}
        </div>
      </div>
    );
  }
}

export default Questions;


  //pull 10 questions and answers from the quiz db 

  // randomize questions selected if more than the number required exist in the db. 

  //this.question, this.choices, this.answer
