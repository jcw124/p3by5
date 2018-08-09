import React, { Component } from 'react';
import update from 'immutability-helper';
import Game from './../../components/Game';
import QuestionCount from './../../components/QuestionCount';
import tempQuestions from './../../utils/API/tempQuestions';
import Navigation from "../../components/Navigation";
import ButtonBtn from "../../components/ButtonBtn";
import Animation from "../../components/Animation";
import teacherProfile from "../../images/user1profile.svg";
import { walkright } from '../../components/Animation'

require('./GamePlay.css');

class GamePlay extends Component {
    //Setting initial state
    state = {
        gameID:"",
        gameName:"",
    }

    componentDidMount(){
        // let session=sessionStorage.getItem("gameID");
        this.setState({ gameID: sessionStorage.getItem("gameID")});
    // interview question:   set state by calling a function to get the current state and prevents
    // the code in 23 is async and the console log lines in 27 -28 could run before its completed
    // this.setState( state => ( { gameID: sessionStorage.getItem("gameID")}));
        console.log("from session storage",sessionStorage.getItem("gameID")); 
        console.log("load!!!", this.state.gameID);
        const shuffledanswerChoices = tempQuestions.map((question) => this.shuffleArray(question.possibleAnswers));
        this.setState (({counter}) => ({
          question: tempQuestions[counter].question,
          answers: shuffledanswerChoices[counter],
          correctAnswer: tempQuestions[counter].correctAnswer
        }));
    }

    // render() {

    //     console.log('game pla loaded')
    //     return (
    //         <div className="container">
    //             <p>Clicked game: {this.state.gameID}</p>
    //             </div>
    //             )
    // }

    constructor(props) {
        super(props);
    
        this.state = {
          counter: 0,
          questionId: 1,
          question: '',
          answers: [],
          correctAnswer: '',
          answersCount: {
            correct: 0,
            incorrect: 0,
          },
          result: ''
         
        };
    console.log("gameplay line 29" , this.state);    
    console.log("tempQuesitons", tempQuestions);
       this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
      }
    
    //   componentDidUpdate() {
    //     const shuffledanswerChoices = tempQuestions.map((question) => this.shuffleArray(question.possibleAnswers));
    //     this.setState (({counter}) => ({
    //       question: tempQuestions[counter].question,
    //       answers: shuffledanswerChoices[counter],
    //       correctAnswer: tempQuestions[counter].correctAnswer
    //     }));
    //    }
       
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

      handleAnswerSelected = (event) => {
        console.log("answer selected event",  event.target.value);
        this.setUserAnswer(event.currentTarget.value);
        console.log("GP 76 -setuseranswer: ", this.setUserAnswer);
         console.log("game play line 61: " + this.state.questionId);
         console.log("game play line 62: " +this.setNextQuestion);
        if (this.state.questionId < tempQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
            console.log("event", event);
        }
      }
     

      setUserAnswer(answer) {
          console.log("Answer 103: " + answer);
        const updatedAnswersCount = update(this.state.answersCount, {
          [answer]: {$apply: (currentValue) => currentValue + 1}
        });
        this.setState({
          answersCount: updatedAnswersCount,
          answer: answer
      });
    }

    setNextQuestion() {
      const counter = this.state.counter + 1;
      const questionId = this.state.questionId + 1;
    console.log("set next question 125: ", this.state);
      this.setState({
          counter: counter,
          questionId: questionId,
          question: tempQuestions[counter].question,
          answers: tempQuestions[counter].answers,
          answer: ''
      });
      console.log("set next questions line: ", this.state.counter);
      console.log("GamePlay state 93: " , this.setState);
      console.log("Game Play  counter: ", counter);
      console.log("GAme Play questionId:", questionId)
    }
    getResults() {
      const answersCount = this.state.answersCount;
      const answersCountKeys = Object.keys(answersCount);
      const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
      const maxAnswerCount = Math.max.apply(null, answersCountValues);
  
      return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }

    setResults(result) {
      if (result.length === 1) {
        this.setState({ result: result[0] });
      } else {
        this.setState({ result: 'Undetermined' });
      }
    }
  



   


    // renderGame() {
    //   return (
    //     <Game
    //       answer={this.state.answer}
    //       answers={this.state.answers}
    //       questionId={this.state.questionId}
    //       question={this.state.question}
    //       questionTotal={tempQuestions.length}
    //       onAnswerSelected={this.handleAnswerSelected}
    //     />
    //   );
    // }

    

    render() {
        console.log("gp 103: ", this.state);
        return (
            <div className="container">
                            <p>Clicked game: {this.state.gameID}</p>
            <div>
            <Navigation />
            <div className="container gameContainer">
                <div className="game">
                <Game
          answer={this.state.correctAnswer}
          answers={this.state.answers}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={tempQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
         
              
                    <Animation />
                </div>
                <div className="footer">
                        <ButtonBtn>
                            Play Again
                        </ButtonBtn>
                        <ButtonBtn>
                            Play
                        </ButtonBtn>
                        <ButtonBtn>
                            Home
                        </ButtonBtn>

                </div>
            </div>
            </div>
            </div>
        )
    }  
}

export default GamePlay;
