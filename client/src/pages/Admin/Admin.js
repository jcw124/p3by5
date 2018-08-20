
import React, { Component } from "react"
import Navigation from "../../components/Navigation";
import { adminAPI, gameAPI, scoreAPI, questionAPI } from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { Link } from 'react-router-dom';
import ButtonBtn from "../../components/ButtonBtn";
import { Input, FormBtn } from "../../components/Form";
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import GameCreate from "../GameCreate";
import './Admin.css';


//Admin page contains 
//new game button to create a new game 
//list container listing all the games
//student high scores - when screen load, show highscore of first game in list 

class Admin extends Component {
    // Setting inital state
    constructor(props) {
        super(props);

        this.state = {
            adminID: "",
            username: "",
            games: [],
            selectedGameID: "",
            gameForScores: "",
            scores: [],
            questions: [],
            questionIndex: 0,
            newGameName: "",
            currentGame: {},
            currentQuestion: "",
            currentAnswer1: "",
            currentAnswer2: "",
            currentAnswer3: "",
            currentCorrect: "",
            updateQuestion: "",
            updateAnswer1: "",
            updateAnswer2: "",
            updateAnswer3: "",
            updateCorrect: "",
            updateID: "",
            deleteGameID: "",
            modal: false,
            confirmDelete: false,
            showEdit: false
        };

    }

    //load into gamelist container existing games 
    componentDidMount() {
        if ((sessionStorage.getItem('adminAuth') === 'yes') && sessionStorage.getItem('adminUsername')) {
            this.setState({ username: sessionStorage.getItem('adminUsername') });
            this.getAdminId(sessionStorage.getItem('adminUsername'));
        }
    }

    getAdminId = username => {
        adminAPI.getAdminbyUsername(username)
            .then(res => {
                this.setState({ adminID: res.data._id });
                this.loadGames(res.data._id);
            })
            .catch(err => console.log(err));
    }

    loadGames = adminID => {
        adminAPI.getGamesbyAdminID(adminID)
            .then(res => {
                this.setState({ games: res.data })
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            currentQuestion: "",
            currentAnswer1: "",
            currentAnswer2: "",
            currentAnswer3: "",
            currentCorrect: "",
            updateQuestion: "",
            updateAnswer1: "",
            updateAnswer2: "",
            updateAnswer3: "",
            updateCorrect: "",
            updateID: ""
        });
    }
    //submit new game name 
    //render new game name on page in game container 
    createGame = event => {
        event.preventDefault();
        gameAPI.saveGame(this.state.newGameName, 0, 0, this.state.adminID)
            .then(res => {
                this.setState({
                    questions: [],
                    currentGame: res.data,
                    selectedGameID: res.data._id,
                    questionIndex: 0,
                    showEdit: false,
                    questionDisplay: null
                }, function () {
                    this.toggle();
                });
                this.loadGames(this.state.adminID);
            })
            .catch(err => console.log(err));
    };

    editGame = event => {
        event.preventDefault();
        this.setState({ selectedGameID: event.target.getAttribute("id") })
        gameAPI.getGame(event.target.getAttribute("id"))
            .then(res => {
                this.setState({
                    questions: res.data.questions,
                    currentGame: res.data,
                    selectedGameID: res.data._id,
                    questionIndex: 0,
                    showEdit: false,
                    questionDisplay: null
                }, function () {
                    if (res.data.questions) {
                        this.setState({
                            questionDisplay: res.data.questions[0],
                            questionIndex: 0
                        })
                    }
                })
            }
            )
            .catch(err => console.log(err));
        this.toggle();
    }

    removeGame = event => {
        event.preventDefault();
        gameAPI.deleteGame(event.target.getAttribute("id"))
            .then(() => {
                this.setState({ confirmDelete: !this.state.confirmDelete });
                this.loadGames(this.state.adminID);
            })
            .catch(err => console.log(err));
    }

    toggleDeleteMessage = event => {
        this.setState({
            deleteGameID: event.target.getAttribute("id"),
            confirmDelete: !this.state.confirmDelete,
        });
    }

    loadEdit = event => {
        event.preventDefault();
        this.setState({
            showEdit: true
        })
        questionAPI.getQuestion(event.target.getAttribute("id"))
            .then(res => {
                this.setState({
                    updateQuestion: res.data.question,
                    updateAnswer1: res.data.possibleAnswers[0],
                    updateAnswer2: res.data.possibleAnswers[1],
                    updateAnswer3: res.data.possibleAnswers[2],
                    updateCorrect: res.data.correctAnswer,
                    updateID: res.data._id
                })
            })
            .catch(err => console.log(err));
    }

    editQuestion = event => {
        event.preventDefault();
        this.setState({
            showEdit: false
        })
        let questionArray = [];
        if (this.state.updateAnswer1 !== "") { questionArray.push(this.state.updateAnswer1); }
        if (this.state.updateAnswer2 !== "") { questionArray.push(this.state.updateAnswer2); }
        if (this.state.updateAnswer3 !== "") { questionArray.push(this.state.updateAnswer3); }
        questionArray.push(this.state.updateCorrect);
        questionAPI.updateQuestion(this.state.updateID, this.state.updateQuestion, questionArray, this.state.updateCorrect)
            .then(res => {
                questionArray = this.state.questions;
                let newArray = [];
                questionArray.forEach(question => {
                    if (question._id === res.data._id) newArray.push(res.data);
                    else newArray.push(question);
                })
                this.setState({
                    questions: newArray,
                    questionDisplay: newArray[this.state.questionIndex],
                    updateQuestion: "",
                    updateAnswer1: "",
                    updateAnswer2: "",
                    updateAnswer3: "",
                    updateCorrect: "",
                    updateID: ""
                });
            })
            .catch(err => console.log(err));
    }

    addQuestion = event => {
        event.preventDefault();
        let questionArray = [];
        if (this.state.currentAnswer1 !== "") { questionArray.push(this.state.currentAnswer1); }
        if (this.state.currentAnswer2 !== "") { questionArray.push(this.state.currentAnswer2); }
        if (this.state.currentAnswer3 !== "") { questionArray.push(this.state.currentAnswer3); }
        questionArray.push(this.state.currentCorrect);
        questionAPI.saveQuestion(this.state.currentQuestion, questionArray, this.state.currentCorrect, this.state.selectedGameID)
            .then(res => {
                questionArray = this.state.questions;
                questionArray.push(res.data);
                this.setState({
                    questions: questionArray,
                    questionDisplay: questionArray[questionArray.length - 1],
                    questionIndex: questionArray.length - 1,
                    currentQuestion: "",
                    currentAnswer1: "",
                    currentAnswer2: "",
                    currentAnswer3: "",
                    currentCorrect: ""
                }, function () {
                    let numWrong = Math.round(this.state.questions.length / 3);
                    gameAPI.updateGame(this.state.selectedGameID, numWrong, this.state.questions.length)
                        .catch(err => console.log(err));
                })
            })
            .catch(err => console.log(err));
    };

    removeQuestion = event => {
        event.preventDefault();
        let questionArray = this.state.questions;
        questionArray = questionArray.filter(question => question._id !== event.target.getAttribute("id"));
        this.setState({
            questions: questionArray,
            questionDisplay: questionArray[0],
            questionIndex: 0
        }, function () {
            let numWrong = Math.round(this.state.questions.length / 3);
            gameAPI.updateGame(this.state.selectedGameID, numWrong, this.state.questions.length)
                .catch(err => console.log(err));
        })
        questionAPI.deleteQuestion(event.target.getAttribute("id"))
            .catch(err => console.log(err));
    }

    lastQuestion = () => {
        if (this.state.questionIndex !== 0) {
            this.setState({
                questionDisplay: this.state.questions[this.state.questionIndex - 1],
                questionIndex: this.state.questionIndex - 1
            })
        }
    }

    nextQuestion = () => {
        if (this.state.questionIndex !== this.state.questions.length - 1) {
            this.setState({
                questionDisplay: this.state.questions[this.state.questionIndex + 1],
                questionIndex: this.state.questionIndex + 1
            })
        }
    }

    loadScores = () => {
        scoreAPI.getScore(this.state.selectedGameID)
            .then(res => this.setState({ scores: res.data }))
            .catch(err => console.log(err));
    }
    //Entering a new game name

    getScores = event => {
        event.preventDefault();
        this.setState({ gameForScores: event.target.name });
        scoreAPI.getScore(event.target.getAttribute("id"))
            .then(res => this.setState({ scores: res.data }))
            .catch(err => console.log(err));

    }

    loginAdmin = admin => {
        adminAPI.adminLogin({ username: admin.username, password: admin.password })
            .then(function (data) {
                if (data.data.success) {
                    this.props.authenticate();
                    sessionStorage.setItem('adminAuth', 'yes');
                    sessionStorage.setItem('adminUsername', this.state.username);
                    window.location.reload();
                }
                else {
                    alert("Username or password is Incorrect.");
                }
            }.bind(this))
            .catch(function (err) { console.log(err); });

    }

    attemptLogin = event => {
        event.preventDefault();
        const usernameInput = this.state.username;
        const passwordInput = this.state.password;

        const objSubmit = {
            username: usernameInput,
            password: passwordInput
        }

        if (!objSubmit.username || !objSubmit.password) {
            return;
        }
        // If we have an email and password we run the loginUser function and clear the form
        this.loginAdmin(objSubmit);
    }

    logout = () => {
        this.props.deAuthenticate();
        sessionStorage.removeItem("adminAuth");
        sessionStorage.removeItem("adminUsername");
        window.location.reload();
    }

    render() {

        return (!(sessionStorage.getItem('adminAuth') === 'yes') ? (
            <div>
                <Navigation />
                <div className="loginWrap">
                    <h1>ADMIN</h1>
                    <h1>Log In Or Register</h1>
                    <div className="loginmodal-container">
                        <form className="login" onSubmit={this.attemptLogin}>
                            <input id="username-input" ref="admin" type="text" name="username" placeholder="Username" onChange={this.handleInputChange} value={this.state.username} />
                            <input id="password-input" ref="password" type="password" name="password" placeholder="Password" onChange={this.handleInputChange} value={this.state.password} />
                            <input type="submit" name="login" className="login loginmodal-submit" value="Login" />
                        </form>
                        <div className="login-help">
                            <Link to={"/adminreg"}> Register </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
            : (
                <div>
                    <Navigation />
                    <div className="AdminWrap">
                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Edit {this.state.currentGame.name}</ModalHeader>
                            <ModalBody>
                                <GameCreate questions={this.state.questions}
                                    gameID={this.state.selectedGameID}
                                    game={this.state.currentGame}
                                    currentQuestion={this.state.currentQuestion}
                                    currentAnswer1={this.state.currentAnswer1}
                                    currentAnswer2={this.state.currentAnswer2}
                                    currentAnswer3={this.state.currentAnswer3}
                                    currentCorrect={this.state.currentCorrect}
                                    handleInputChange={this.handleInputChange}
                                    addQuestion={this.addQuestion}
                                    removeQuestion={this.removeQuestion}
                                    updateQuestion={this.state.updateQuestion}
                                    updateAnswer1={this.state.updateAnswer1}
                                    updateAnswer2={this.state.updateAnswer2}
                                    updateAnswer3={this.state.updateAnswer3}
                                    updateCorrect={this.state.updateCorrect}
                                    updateID={this.state.updateID}
                                    loadEdit={this.loadEdit}
                                    editQuestion={this.editQuestion}
                                    showEdit={this.state.showEdit}
                                    questionDisplay={this.state.questionDisplay}
                                    questionIndex={this.state.questionIndex}
                                    lastQuestion={this.lastQuestion}
                                    nextQuestion={this.nextQuestion}
                                />
                            </ModalBody>
                            <ModalFooter><ButtonBtn onClick={this.toggle}>Done</ButtonBtn></ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.confirmDelete} toggle={this.toggleDeleteMessage}>
                            <ModalHeader toggle={this.toggleDeleteMessage}>Are You Sure You Want to Delete This Game?</ModalHeader>
                            <ModalBody>
                                <p>This will permanently delete the game you have selected. All game data, including scores, will be removed.</p>
                            </ModalBody>
                            <ModalFooter>
                                <ButtonBtn onClick={this.toggleDeleteMessage}>Cancel</ButtonBtn>
                                <button className="btn btn-danger" id={this.state.deleteGameID} onClick={this.removeGame}>DELETE</button>
                            </ModalFooter>
                        </Modal>
                        <div className="row">
                            <div className="col-lg-6">
                                <h1>Current EduGames</h1>
                                <div className="container">
                                    {this.state.games.length ? (
                                        <List>
                                            {this.state.games.map(game => {
                                                return (
                                                    <div key={game._id} className="card">
                                                        <div className="card-body">
                                                            <ListItem>
                                                                <h3>{game.name}</h3>
                                                                <div className="btn-group" role="group" aria-label="Game Controls">
                                                                    <button type="button" className="btn btn-primary btn-small" id={game._id} name={game.name} onClick={this.getScores}>View Scores</button>
                                                                    <button type="button" className="btn btn-primary btn-small" id={game._id} onClick={this.editGame}>Edit</button>
                                                                    <button type="button" className="btn btn-danger btn-small" id={game._id} onClick={this.toggleDeleteMessage}>Delete Game</button>
                                                                </div>
                                                            </ListItem>
                                                        </div>
                                                    </div>

                                                );
                                            })}
                                        </List>
                                    ) : (
                                            <h5>Create a game to begin</h5>
                                        )}
                                </div>
                            </div>
                            <div className="createGame col-lg-6">
                                <h1>Create a Game</h1>
                                <div className="container createNewGame">
                                    <form>
                                        <Input
                                            value={this.state.newGameName}
                                            onChange={this.handleInputChange}
                                            name="newGameName"
                                            placeholder="Game Name"
                                        />
                                        <FormBtn
                                            disabled={!(this.state.newGameName)}
                                            onClick={this.createGame}>
                                            Create New Game
                                    </FormBtn>
                                    </form>
                                </div>
                                <br />
                                <div className="container highScore">
                                    <h1>High Scores</h1>
                                    <h4>{this.state.gameForScores}</h4>
                                    {this.state.scores.length ? (
                                        <Table borderless size="sm">
                                        <thead>
                                          <tr>
                                            <th>Username</th>
                                            <th>Number Correct</th>
                                            <th>Number Wrong</th>
                                            <th>Won/Lost</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.scores.map(score =>
                                          <tr key={score._id}>
                                            <td>{score.user.username}</td>
                                            <td>{score.score.numRight}</td>
                                            <td>{score.score.numWrong}</td>
                                            <td>{score.score.won?"Won":"Lost"}</td>
                                          </tr>
                                        )}
                                        </tbody>
                                      </Table>
                                    ) : (
                                            <h3>No Scores to Display</h3>
                                        )}
                                </div>
                            </div>
                            <FormBtn onClick={this.logout}>logout</FormBtn>
                        </div>
                    </div>
                </div>
            ));
    }
}
export default Admin;