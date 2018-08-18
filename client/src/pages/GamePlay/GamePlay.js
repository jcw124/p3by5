import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import Game from './../../components/Game';
import { Redirect } from 'react-router-dom';
// import QuestionCount from './../../components/QuestionCount';
// import tempQuestions from './../../utils/API/tempQuestions';
import Navigation from "../../components/Navigation";
import ButtonBtn from "../../components/ButtonBtn";
import Animation from "../../components/Animation";
import { adminAPI, gameAPI, scoreAPI, questionAPI } from "../../utils/API";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import teacherProfile from "../../images/user1profile.svg";
import { NavItem, NavLink } from "reactstrap";
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
            result: '',
            disableGame: false
        };
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {
        const ID = sessionStorage.getItem("gameID"),
            numCorrect = parseInt(sessionStorage.getItem(`numCorrect${sessionStorage.getItem("gameID")}`)),
            numWrong = parseInt(sessionStorage.getItem(`numWrong${sessionStorage.getItem("gameID")}`));

        this.setState({ gameID: ID });
        if (sessionStorage.getItem(`gameCounter${ID}`)) {
            this.setState({
                counter: parseInt(sessionStorage.getItem(`gameCounter${ID}`))
            })
        }
        if (sessionStorage.getItem(`numCorrect${ID}`)) {
            document.querySelector('#user').classList.add(`walk${numCorrect}`);
            this.setState({
                userProgress: numCorrect,
                answersCount: {
                    correct: numCorrect,
                    incorrect: this.state.answersCount.incorrect
                }
            }, function () {
                if (sessionStorage.getItem(`numWrong${ID}`)) {
                    document.querySelector('#teacher').classList.add(`walk${numWrong}`);
                    this.setState({
                        teacherProgress: numWrong,
                        answersCount: {
                            correct: this.state.answersCount.correct,
                            incorrect: numWrong
                        }
                    })
                }
            })
        } else {
            if (sessionStorage.getItem(`numWrong${ID}`)) {
                document.querySelector('#teacher').classList.add(`walk${numWrong}`);
                this.setState({
                    teacherProgress: numWrong,
                    answersCount: {
                        correct: this.state.answersCount.correct,
                        incorrect: numWrong
                    }
                })
            }
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
                    game: res.data,
                    maxWrong: res.data.numberWrongPermitted,
                    maxRight: res.data.numberofQuestions - res.data.numberWrongPermitted
                }, function () {
                    console.log(this.state.maxWrong, this.state.maxRight);
                })
            })
            .catch(err => console.log(err));
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            disableGame: true
        });
    }


    shuffleArray(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
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
        if (this.state.answersCount.correct < this.state.maxRight && this.state.answersCount.incorrect < this.state.maxWrong) {
            sessionStorage.setItem(`gameCounter${sessionStorage.getItem("gameID")}`, counter);
        }
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
        this.setNextQuestion();
    }

    logScore = wonLost => {
        let won = true;
        if (wonLost === "lost") won = false;
        let scoreObj = {
            numRight: this.state.answersCount.correct,
            numWrong: this.state.answersCount.incorrect,
            won: won
        }
        scoreAPI.saveScore(scoreObj, this.state.gameID, sessionStorage.getItem("userID"))
            .then(res => {
                sessionStorage.removeItem(`numCorrect${sessionStorage.getItem("gameID")}`);
                sessionStorage.removeItem(`numWrong${sessionStorage.getItem("gameID")}`);
                sessionStorage.removeItem(`gameCounter${sessionStorage.getItem("gameID")}`);
                this.toggle();
            })
            .catch(err => console.log(err));
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
            if (this.state.answersCount.correct >= this.state.maxRight) {
                this.logScore("won");
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
            if (this.state.answersCount.incorrect >= this.state.maxWrong) {
                this.logScore("lost");
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
        return (!(sessionStorage.getItem("userAuth") === 'yes') ?
            <Redirect to={{ pathname: '/login' }} /> :
            <div className="play container">
                {/* <Navigation />
                <div className="scoreCountRedGreen">
                    <div className="wrong">{this.state.answersCount.incorrect}</div>
                    <div className="correct">{this.state.answersCount.correct}</div>
                </div> */}
                <div>
                    <Navigation />
                    <div className="scoreCountRedGreen">
                        <div className="wrong">{this.state.answersCount.incorrect}</div>
                        <div className="correct">{this.state.answersCount.correct}</div>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalBody>
                            {this.state.answersCount.incorrect === this.state.maxWrong ?
                                <h3> Game Over: Go back and try again </h3>
                                :
                                <h3> Awesome Work!! Try another game </h3>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <div className="footer">
                                    <ButtonBtn><Link to="/User">Home</Link></ButtonBtn>
                            </div>
                        </ModalFooter>
                    </Modal>

                    <div className="container gameContainer">
                        <div className="game">
                            {this.state.disableGame ? <ButtonBtn><Link to="/User">Home</Link></ButtonBtn> :
                                <Game
                                    answer={this.state.answer}
                                    correctAnswer={this.state.correctAnswer}
                                    answers={this.state.answers}
                                    questionId={this.state.counter + 1}
                                    question={this.state.question}
                                    questionTotal={this.state.game.questions.length}
                                    onAnswerSelected={this.handleAnswerSelected}
                                />
                            }
                            <div className="animationWrap">
                                <Animation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GamePlay;
