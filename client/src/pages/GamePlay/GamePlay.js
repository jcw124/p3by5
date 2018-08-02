import React, { Component } from "react";
import Questions from "../../components/Questions";
import Answers from "../../components/Answers";
import ButtonBtn from "../../components/ButtonBtn";
import Score from "../../components/Score";
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
            {/* <QuestionNumber
              counter={props.questionId}
              total={props.questionTotal}
            /> */}
            <Questions content={props.question} />
            <ul className="answers">
              {props.Answers.map(renderAnswers)}
            </ul>
          </div>
        </CSSTransitionGroup>
      );


}





class GamePlay extends Component {
    render() {
        return (
            <div className="container">
                <div className="game">
                    <Questions />
                    <Answers />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <ButtonBtn>
                            Play Again
                        </ButtonBtn>
                    </div>
                    <div className="col-md-4">
                        <ButtonBtn>
                            Play
                        </ButtonBtn>
                    </div>
                    <div className="col-md-4">
                        <ButtonBtn>
                            Home
                        </ButtonBtn>
                    </div>

                </div>
            </div>
        )
    }
}

export default GamePlay;