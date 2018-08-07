
import React, { Component } from "react"
import Navigation from "../../components/Navigation";
import { adminAPI, gameAPI, scoreAPI, questionAPI } from "../../utils/API";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";
import ButtonBtn from "../../components/ButtonBtn";
import { Input, FormBtn } from "../../components/Form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GameCreate } from "../GameCreate";

require('./Admin.css');


//Admin page contains 
//new game button to create a new game 
//list container listing all the games
//student high scores - when screen load, show highscore of first game in list 

class Admin extends Component {
    // Setting inital state
    state = {
        adminID: "",
        username: "admin1",
        password: "password1",
        games: [],
        selectedGameID: "",
        gameForScores: "",
        scores: [],
        questions: [],
        newGameName: "",
        newGameWrong: 3,
        newGameQuestions: 10,
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
        confirmDelete: false
    };

    //load into gamelist container existing games 
    componentDidMount() {
        this.getAdminId();
    }

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

    toggleDeleteMessage = event => {
        this.setState({
            deleteGameID: event.target.getAttribute("id"),
            confirmDelete: !this.state.confirmDelete,
        });
    }

    loadEdit = event => {
        event.preventDefault();
        console.log("loading edit");
        questionAPI.getQuestion(event.target.getAttribute("id"))
            .then(res => {
                console.log(res.data);
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
        let questionArray = [];
        if (this.state.updateAnswer1 !== "") { questionArray.push(this.state.updateAnswer1); }
        if (this.state.updateAnswer2 !== "") { questionArray.push(this.state.updateAnswer2); }
        if (this.state.updateAnswer3 !== "") { questionArray.push(this.state.updateAnswer3); }
        questionArray.push(this.state.updateCorrect);
        questionAPI.updateQuestion(this.state.updateID, this.state.updateQuestion, questionArray, this.state.updateCorrect)
            .then(res => {
                console.log("NEW UPDATED QUESTION:", res.data);
                questionArray = this.state.questions;
                let newArray = [];
                questionArray.forEach(question => {
                    if (question._id === res.data._id) newArray.push(res.data);
                    else newArray.push(question);
                })
                this.setState({
                    questions: newArray,
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

    getAdminId = () => {
        adminAPI.getAdminbyUsernamePass(this.state.username, this.state.password)
            .then(res => {
                console.log("got admin id", res);
                this.setState({ adminID: res.data._id });
                this.loadGames();
            })
            .catch(err => console.log(err));
    }

    loadGames = () => {
        adminAPI.getGamesbyAdminID(this.state.adminID)
            .then(res => {
                this.setState({ games: res.data })
            })
            .catch(err => console.log(err));
    };

    addQuestion = event => {
        event.preventDefault();
        console.log("ADDING QUESTION");
        let questionArray = [];
        if (this.state.currentAnswer1 !== "") { questionArray.push(this.state.currentAnswer1); }
        if (this.state.currentAnswer2 !== "") { questionArray.push(this.state.currentAnswer2); }
        if (this.state.currentAnswer3 !== "") { questionArray.push(this.state.currentAnswer3); }
        console.log("saving", this.state.currentQuestion, questionArray, this.state.currentCorrect, this.state.selectedGameID)
        questionArray.push(this.state.currentCorrect);
        questionAPI.saveQuestion(this.state.currentQuestion, questionArray, this.state.currentCorrect, this.state.selectedGameID)
            .then(res => {
                questionArray = this.state.questions;
                console.log("NEW QUESTION", res.data);
                questionArray.push(res.data);
                this.setState({
                    questions: questionArray,
                    currentQuestion: "",
                    currentAnswer1: "",
                    currentAnswer2: "",
                    currentAnswer3: "",
                    currentCorrect: ""
                })
            })
    };

    removeQuestion = event => {
        event.preventDefault();
        console.log("removing question");
        let questionArray = this.state.questions;
        questionArray = questionArray.filter(question => question._id !== event.target.getAttribute("id"));
        this.setState({ questions: questionArray })
        questionAPI.deleteQuestion(event.target.getAttribute("id"))
            .catch(err => console.log(err));
    }

    loadScores = () => {
        scoreAPI.getScore(this.state.selectedGameID)
            .then(res => this.setState({ scores: res.data }))
            .catch(err => console.log(err));
    }
    //Entering a new game name


    //submit new game name 
    //render new game name on page in game container 
    createGame = event => {
        event.preventDefault();
        console.log("creating game...");
        gameAPI.saveGame(this.state.newGameName, this.state.newGameWrong, this.state.newGameQuestions, this.state.adminID)
            .then(res => {
                this.setState({
                    questions: [],
                    currentGame: res.data,
                    selectedGameID: res.data._id
                });
                this.loadGames();
                this.toggle();
            })
            .catch(err => console.log(err));
    };

    editGame = event => {
        event.preventDefault();
        console.log(event.target.getAttribute("id"));
        this.setState({ selectedGameID: event.target.getAttribute("id") })
        gameAPI.getGame(event.target.getAttribute("id"))
            .then(res => {
                console.log(res.data);
                this.setState({
                    questions: res.data.questions,
                    currentGame: res.data
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
                this.loadGames();
            })
            .catch(err => console.log(err));
    }

    getScores = event => {
        event.preventDefault();
        this.setState({ gameForScores: event.target.name });
        scoreAPI.getScore(event.target.getAttribute("id"))
            .then(res => this.setState({ scores: res.data }))
            .catch(err => console.log(err));

    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="AdminWrap">
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Edit Game</ModalHeader>
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
                                editQuestion={this.editQuestion} />
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
                                                <ListItem key={game._id}>
                                                    <h3>{game.name}</h3>
                                                    <button className="btn btn-primary" id={game._id} name={game.name} onClick={this.getScores}>View Scores</button>
                                                    <BtnEdit id={game._id} click={this.editGame} />
                                                    <button className="btn btn-danger" id={game._id} onClick={this.toggleDeleteMessage}>Delete Game</button>
                                                </ListItem>
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
                                        click={this.createGame}
                                        text="Create New Game"
                                    />
                                </form>
                            </div>
                            <br />
                            <div className="container highScore">
                                <h5>Student Progress</h5>

                                {/* show each student's high score depending on the game selected */}
                                <p> all student results will go in this container </p>
                                <h5>High Scores</h5>
                                <h4>{this.state.gameForScores}</h4>
                                {this.state.scores.length ? (
                                    <List>
                                        {this.state.scores.map(score =>
                                            <ListItem key={score._id}>
                                                <p>{score.user.username}:</p>
                                                <p>{score.name} {score.score}</p>
                                            </ListItem>
                                        )}
                                    </List>
                                ) : (
                                        <h3>No Scores for this Game Yet</h3>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Admin;
