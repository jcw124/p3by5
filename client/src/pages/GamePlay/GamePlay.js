import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import Game from './../../components/Game';
import QuestionCount from './../../components/QuestionCount';
import tempQuestions from './../../utils/API/tempQuestions';
import Navigation from "../../components/Navigation";
import ButtonBtn from "../../components/ButtonBtn";
import Animation from "../../components/Animation";
import { adminAPI, gameAPI, scoreAPI, questionAPI } from "../../utils/API";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import teacherProfile from "../../images/user1profile.svg";
import{
    NavItem,
    NavLink
   } from "reactstrap";
import './GamePlay.css';

class GamePlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameID: "",
            gameName: "",
            game: { questions: [null] },
            teacherProgress: 0,
            userProgress: 0,
            counter: 0,
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
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {
        if (!sessionStorage.getItem("gameID")) { this.context.router.history.push("/login") };
        this.setState({ gameID: sessionStorage.getItem("gameID") });
        if (sessionStorage.getItem(`gameCounter${sessionStorage.getItem("gameID")}`)) {
            this.setState({
                counter: parseInt(sessionStorage.getItem(`gameCounter${sessionStorage.getItem("gameID")}`))
            })
        }
        if (sessionStorage.getItem(`numCorrect${sessionStorage.getItem("gameID")}`)) {
            this.setState({
                answersCount: {
                    correct: parseInt(sessionStorage.getItem(`numCorrect${sessionStorage.getItem("gameID")}`)),
                    incorrect: this.state.answersCount.incorrect
                }
            })
        }
        if (sessionStorage.getItem(`numWrong${sessionStorage.getItem("gameID")}`)) {
            this.setState({
                answersCount: {
                    correct: this.state.answersCount.correct,
                    incorrect: parseInt(sessionStorage.getItem(`numWrong${sessionStorage.getItem("gameID")}`))
                }
            })
        }
        gameAPI.getGame(sessionStorage.getItem("gameID"))
            .then(res => {
                console.log(res.data);
                const shuffledanswerChoices = res.data.questions.map((question) => this.shuffleArray(question.possibleAnswers));
                this.setState(({ counter }) => ({
                    question: res.data.questions[counter].question,
                    answers: shuffledanswerChoices[counter],
                    correctAnswer: res.data.questions[counter].correctAnswer
                }));
                this.setState({
                    game: res.data
                })
            })
            .catch(err => console.log(err));
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
        sessionStorage.setItem(`gameCounter${this.state.gameID}`, counter);
        this.setState({
            counter: counter,
            question: this.state.game.questions[counter].question,
            answers: this.state.game.questions[counter].possibleAnswers,
            correctAnswer: this.state.game.questions[counter].correctAnswer,
            answer: ''
        });
    }

    handleAnswerSelected = event => {
        this.setUserAnswer(event.target.value);
        if ((this.state.counter + 1) < this.state.game.questions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } 
        if (this.state.answersCount.correct === 7 || this.state.answersCount.incorrect ===3) {
            sessionStorage.removeItem(`numCorrect${this.state.gameID}`);
            sessionStorage.removeItem(`numWrong${this.state.gameID}`);
            sessionStorage.removeItem(`gameCounter${this.state.gameID}`);
            console.log("GAME OVER!");
            console.log("right:", this.state.answersCount.correct);
            console.log("wrong:", this.state.answersCount.incorrect);
        }
    }


    setUserAnswer = answer => {
        if (answer === this.state.correctAnswer) {
            sessionStorage.setItem(`numCorrect${this.state.gameID}`, this.state.answersCount.correct + 1);
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
            sessionStorage.setItem(`numWrong${this.state.gameID}`, this.state.answersCount.incorrect + 1);
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
        if (this.state.userProgress === 0) {
            user.classList.add("walk1");
            this.setState({
                userProgress: 1
            });
            console.log(this.state.userProgress);
        } else if (this.state.userProgress === 1) {
            user.classList.add("walk2");
            this.setState({
                userProgress: 2
            });
            console.log(this.stateuuserProgress);
        } else if (this.state.userProgress === 2) {
            user.classList.add("walk3");
            this.setState({
                userProgress: 3
            });
        } else if (this.state.userProgress === 3) {
            user.classList.add("walk4");
            this.setState({
                userProgress: 4
            });
        } else if (this.state.userProgress === 4) {
            user.classList.add("walk5");
            this.setState({
                userProgress: 5
            });
        } else if (this.state.userProgress === 5) {
            user.classList.add("walk6");
            this.setState({
                userProgress: 6
            });
        } else if (this.state.userProgress === 6) {
            user.classList.add("walk7");
            // this.setState({
            //     userProgress: 7
            // });
        };
    };

    walkright = () => {
        // let teacher = document.getElementById('teacher');
        if (this.state.teacherProgress === 0) {
            document.querySelector('#teacher').classList.add("walk1");
            this.setState({
                teacherProgress: 1
            });
            console.log(this.state.teacherProgress);
        } else if (this.state.teacherProgress === 1) {
            document.querySelector('#teacher').classList.add("walk2");
            this.setState({
                teacherProgress: 2
            });
            console.log(this.state.teacherProgress);
        } else if (this.state.teacherProgress === 2) {
            document.querySelector('#teacher').classList.add("walk3");
            // this.setState({
            //     userProgress: 3
            // });
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

    render() {
        return (
            <div className="play container"> 
                
                    <Navigation />
                    <div className="scoreCountRedGreen">
                        <div className="wrong" href="">0</div>
                        <div className="correct" href="">0</div>
                    </div>
          {/* <div className="container">  */}
                <div>
                    <Navigation />

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalBody>
                            {this.state.answersCount.incorrect === 3 ? 
                            <h3> Game Over: Go back and try again!! </h3> 
                            : 
                            <h3> Awesome Work!! Try another game </h3>
                            } 
                        </ModalBody>
                        <ModalFooter>
                            <div className="footer">
                                <button>
                                    <Link 
                                        onClick={this.handleAnswerSelected}
                                        to="/User">
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
                                questionId={this.state.counter + 1}
                                question={this.state.question}
                                questionTotal={this.state.game.questions.length}
                                onAnswerSelected={this.handleAnswerSelected}
                            />

                            <div className="animationWrap">
                                <Animation />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

export default GamePlay;
