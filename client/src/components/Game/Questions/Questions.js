//import React from "react";
import React, { Component } from "react";
import "./Questions.css";
import gameQuestions from "./Questions.json";
import update from 'immutability-helper';
import {
  ButtonGroup,
  Button
} from "reactstrap";
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import QuestionCount from '../components/QuestionCount';
import Answers from '../components/Answers';

class Questions extends Component {

constructor(props) {
  super(props);

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

  this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
}

componentWillMount() {
 const shuffledanswerChoices = gameQuestions.map((question) => this.shuffleArray(question.answers));
 this.setState({
   question: gameQuestions[0].question,
   answerChoices: shuffledanswerChoices[0]
 });
}

shuffleArray(array) {
 var currentIndex = array.length, temporaryValue, randomIndex;

 // While there remain elements to shuffle...
 while (0 !== currentIndex) {

   // Pick a remaining element...
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex -= 1;

   // And swap it with the current element.
   temporaryValue = array[currentIndex];
   array[currentIndex] = array[randomIndex];
   array[randomIndex] = temporaryValue;
 }

 return array;
};

handleAnswerSelected(event) {
 this.setUserAnswer(event.currentTarget.value);

 if (this.state.questionId < gameQuestions.length) {
     setTimeout(() => this.setNextQuestion(), 300);
 } else {
     setTimeout(() => this.setResults(this.getResults()), 300);
 }
}

setUserAnswer(answer) {
 const updatedanswersTotal = update(this.state.answersTotal, {
   [answer]: {$apply: (currentValue) => currentValue + 1}
 });

 this.setState({
     answersTotal: updatedanswersTotal,
     answer: answer
 });
}

setNextQuestion() {
 const counter = this.state.counter + 1;
 const questionId = this.state.questionId + 1;

 this.setState({
     counter: counter,
     questionId: questionId,
     question: gameQuestions[counter].question,
     answerChoices: gameQuestions[counter].answers,
     answer: ''
 });
}

getResults() {
 const answersTotal = this.state.answersTotal;
 const answersTotalKeys = Object.keys(answersTotal);
 const answersTotalValues = answersTotalKeys.map((key) => answersTotal[key]);
 const maxAnswerCount = Math.max.apply(null, answersTotalValues);

 return answersTotalKeys.filter((key) => answersTotal[key] === maxAnswerCount);
}

setResults(result) {
 if (result.length === 1) {
   this.setState({ result: result[0] });
 } else {
   this.setState({ result: 'Undetermined' });
 }
}

renderQuiz() {
 return (
   <Quiz
     answer={this.state.answer}
     answerChoices={this.state.answerChoices}
     questionId={this.state.questionId}
     question={this.state.question}
     questionTotal={gameQuestions.length}
     onAnswerSelected={this.handleAnswerSelected}
   />
 );
}

renderResult() {
 return (
   <Result quizResult={this.state.result} />
 );
}

}

export default Questions;