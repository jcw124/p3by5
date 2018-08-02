import React, { Component } from "react";
import Score from "./Score";
import Questions from "./Questions";
// import Answers from "./Answers";
import PreBtn from "./PreBtn";
import PostBtn from "./PostBtn";
import WinLose from "./WinLose";
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardBody,
  CardTitle, 
  CardText 
} from 'reactstrap';
import "./Game.css"; 



constructor(props) {
  super(props);

  //set states
  this.state={
    counter: 0,
    questionNum: 1,
    question: '',
    answerChoices: [],
    answer: '',
    answersTotals: {
      correct: 0,
      incorrect: 0
    },
    result: ''
  };

  
}


class App extends Component {
  render() {
    return(
      <div className="container">
        <Card>
          <CardHeader>
              <Score />
          </CardHeader>
          <CardBody>
              <p>This is where the game will go</p>
              <Questions />
              {/* <Answers /> */}
              <p>The sprites animation will go here</p>
              <WinLose />
          </CardBody>
          <CardFooter>
              <PreBtn />
              <PostBtn />
          </CardFooter>
        </Card>
      </div>
    )
  }
}

  
export default App;
