import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import Game from './../../components/Game';
import QuestionCount from './../../components/QuestionCount';
import tempQuestions from './../../utils/API/tempQuestions';
import Navigation from "../../components/Navigation";
import ButtonBtn from "../../components/ButtonBtn";
import Animation from "../../components/Animation";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import teacherProfile from "../../images/user1profile.svg";
import './GamePlay.css';

class GamePlay extends Component {
    //Setting initial state
    constructor(props) {
        super(props);

        this.state = {
            gameID: "",
            gameName: "",
            teacherProgress: 0,
            userProgress: 0,
            counter: 0,
            questionId: 1,
            question: '',
            answers: [],
            correctAnswer: '',
            answersCount: {
                correct: 0,
                incorrect: 0,
            },
            answer: '',
            result: ''

        };
        console.log("gameplay line 29", this.state);
        console.log("tempQuesitons", tempQuestions);
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {
        this.setState({ gameID: sessionStorage.getItem("gameID") });
        // the code in 23 is async and the console log lines in 27 -28 could run before its completed
        // this.setState( state => ( { gameID: sessionStorage.getItem("gameID")}));
        console.log("from session storage", sessionStorage.getItem("gameID"));
        console.log("load!!!", this.state.gameID);
        const shuffledanswerChoices = tempQuestions.map((question) => this.shuffleArray(question.possibleAnswers));
        this.setState(({ counter }) => ({
            question: tempQuestions[counter].question,
            answers: shuffledanswerChoices[counter],
            correctAnswer: tempQuestions[counter].correctAnswer
        }));
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
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

    setNextQuestion = () => {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            counter: counter,
            questionId: questionId,
            question: tempQuestions[counter].question,
            answers: tempQuestions[counter].possibleAnswers,
            correctAnswer: tempQuestions[counter].correctAnswer,
            answer: ''
        });
    }

    handleAnswerSelected = event => {
        this.setUserAnswer(event.target.value);
        if (this.state.questionId < tempQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            console.log("GAME OVER!");
            console.log("right:", this.state.answersCount.correct);
            console.log("wrong:", this.state.answersCount.incorrect);
        }
    }


    setUserAnswer = answer => {
        if (answer == this.state.correctAnswer) {
            console.log("THATS CORRECT");
            this.setState({
                answersCount: {
                    correct: this.state.answersCount.correct += 1,
                    incorrect: this.state.answersCount.incorrect
                },
                answer: answer
            });
            this.walkleft();
            if(this.state.answersCount.correct === 7 ) {
                this.toggle()
            }
        }
        else {
            console.log("THATS INCORRECT");
            this.setState({
                answersCount: {
                    correct: this.state.answersCount.correct,
                    incorrect: this.state.answersCount.incorrect += 1,
                },
                answer: answer
            });
            this.walkright();
            if(this.state.answersCount.incorrect === 3 ) {
                this.toggle()
            }
        }
        console.log(
            "correct", this.state.answersCount
        )
        
    }

    walkleft = () => {
        let user = document.querySelector('#user');
        if (this.state.userProgress == 0) {
            user.classList.add("walk1");
            this.setState({
                userProgress: 1
            });
            console.log(this.state.userProgress);
        } else if (this.state.userProgress == 1) {
            user.classList.add("walk2");
            this.setState({
                userProgress: 2
            });
            console.log(this.stateuuserProgress);
        } else if (this.state.userProgress == 2) {
            user.classList.add("walk3");
            this.setState({
                userProgress: 3
            });
        } else if (this.state.userProgress == 3) {
            user.classList.add("walk4");
            this.setState({
                userProgress: 4
            });
        } else if (this.state.userProgress == 4) {
            user.classList.add("walk5");
            this.setState({
                userProgress: 5
            });
        } else if (this.state.userProgress == 5) {
            user.classList.add("walk6");
            this.setState({
                userProgress: 6
            });
        } else if (this.state.userProgress == 6) {
            user.classList.add("walk7");
        };
    };

    walkright = () => {
        // let teacher = document.getElementById('teacher');
        if (this.state.teacherProgress == 0) {
            document.querySelector('#teacher').classList.add("walk1");
            this.setState({
                teacherProgress: 1
            });
            console.log(this.state.teacherProgress);
        } else if (this.state.teacherProgress == 1) {
            document.querySelector('#teacher').classList.add("walk2");
            this.setState({
                teacherProgress: 2
            });
            console.log(this.state.teacherProgress);
        } else if (this.state.teacherProgress == 2) {
            document.querySelector('#teacher').classList.add("walk3");
        };
    };

    getResults = () => {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);

        return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }

    setResults = result => {
        if (result.length === 1) {
            this.setState({ result: result[0] });
        } else {
            this.setState({ result: 'Undetermined' });
        }
    }

    resetState = event => {
        event.preventDefault();
        this.setState({
            teacherProgress: 0,
            userProgress: 0,
            counter: 0,
            questionId: 1,
            question: '',
            answers: [],
            correctAnswer: '',
            answersCount: {
                correct: 0,
                incorrect: 0,
            },
            answer: '',
            result: ''
        })
        this.componentDidMount();
        console.log (this.state.gameID);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <Navigation />

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalBody>
                            {this.state.answersCount.incorrect === 3 ? 
                            <h3> Game Over: Do you want to try again? </h3> 
                            : 
                            <h3> Awesome Work!! Try another game </h3>
                            } 
                        </ModalBody>
                        <ModalFooter>
                            <div className="footer">
                            <button>
                                <Link onClick={this.resetState} to="/Play">
                                    Play Again
                                </Link>
                            </button>
                            <button>
                                <Link to="/User">
                                    Home
                                </Link>
                            </button>
                            </div>
                        </ModalFooter>
                    </Modal>

                    <div className="container gameContainer">
                        <div className="game">
                            <Game
                                answer={this.state.answer}
                                correctAnswer={this.state.correctAnswer}
                                answers={this.state.answers}
                                questionId={this.state.questionId}
                                question={this.state.question}
                                questionTotal={tempQuestions.length}
                                onAnswerSelected={this.handleAnswerSelected}
                            />
                            <Animation />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GamePlay;
