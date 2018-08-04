import React from 'react';
import Questions from './../Questions'
import QuestionCount from './../QuestionCount';
import Answers from './../Answers';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

function Game(props) {

  function renderAnswers(key) {
    return (
      <Answers
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
    console.log("Questions line 20: " + Answers);
  }

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
      <div key={props.questionId}>
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
        <Questions content={props.questions} />
        <ul className="answers">
          {props.answers.map(renderAnswers)}
        </ul>
      </div>
    </CSSTransitionGroup>
  );
}


export default Game;
