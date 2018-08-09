import React from 'react';
import Questions from './../Questions'
import QuestionCount from './../QuestionCount';
import Answers from './../Answers';
import teacherProfile from "../../images/user1profile.svg";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

function Game(props) {
console.log("Game props: ", props);
console.log("game questionID: ", props.questionId );
  function renderAnswers(key) {
    return (
      <Answers
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );

  }

  console.log("game.js 23: ", props);
  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
        <QuestionCount
         counter={props.questionId}
          total={props.questionTotal}
        />

      <div className="QandA" key={props.questionId}>
        <Questions content={props.question} />
        <div className="user">
            <img alt="teacher_icon" src={teacherProfile} />
        </div>
        {/* <ul className="answers"> </ul> */}
       <Answers 
        answers={props.answers}
        onAnswerSelected={props.onAnswerSelected}
       />
    
     
      </div>
    </CSSTransitionGroup>
  );

}


export default Game;
