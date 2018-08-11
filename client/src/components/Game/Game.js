import React from 'react';
import Questions from './../Questions'
import QuestionCount from './../QuestionCount';
import Answers from './../Answers';
import teacherProfile from "../../images/user1profile.svg";
//import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

function Game(props) {
  return (
    // <CSSTransitionGroup
    //     // className="container"
    //     // component="div"
    //     // transitionName="fade"
    //     // transitionEnterTimeout={2000}
    //     // transitionLeaveTimeout={10}
    //     // transitionAppear
    //     //  transitionAppearTimeout={2000}
    // >
    <div>
        <QuestionCount
         counter={props.questionId}
          total={props.questionTotal}
        />

      <div className="QandA" key={props.questionId}>
        <Questions content={props.question} />
        <div className="user">
            <img alt="teacher_icon" src={teacherProfile} />
        </div>
       <Answers 
        answers={props.answers}
        onAnswerSelected={props.onAnswerSelected}
       />
    
     
      </div>
    {/* </CSSTransitionGroup> */}
    </div>
  );

}


export default Game;
