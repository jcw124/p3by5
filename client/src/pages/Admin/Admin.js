import React, { Component } from "react"
import { adminAPI, gameAPI, scoreAPI } from "../../utils/API";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";
import ButtonBtn from "../../components/ButtonBtn";
import { Input, FormBtn } from "../../components/Form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GameCreate } from "../GameCreate";

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
        scores: [],
        newGameName: "",
        newGameWrong: 3,
        newGameQuestions: 10,
        currentGame: {},
        currentQuestion: "",
        currentAnswers: [],
        currentCorrect: "",

        modal: false
    };

    //load into gamelist container existing games 
    componentDidMount() {
        this.getAdminId();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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
                console.log("loading games", res);
                this.setState({ games: res.data })
            })
            .catch(err => console.log(err));
    };

    loadScores = () => {
        scoreAPI.getScore(this.state.selectedGameID)
            .then(res => this.setState({ scores: res.data }))
            .catch(err => console.log(err));
    }

    editGame = event => {
        let targetGame;
        for (let i = 0; i < this.state.games.length; i++) {
            if(this.state.games[i]._id===event.target.getAttribute("id")){
                targetGame=this.state.games[i];
            }
        }
        this.setState({
            currentGame: targetGame,
            selectedGameID: event.target.getAttribute("id")
        });

        this.toggle();
    }
    //Entering a new game name
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //submit new game name 
    //render new game name on page in game container 
    createGame = event => {
        event.preventDefault();
        console.log("creating game...");
        gameAPI.saveGame(this.state.newGameName, this.state.newGameWrong, this.state.newGameQuestions, this.state.adminID)
            .then(res => {
                this.loadGames();
                this.setState({
                    selectedGameID: res._id
                });
                this.toggle();
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="container">
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Game</ModalHeader>
                    <ModalBody>
                        <GameCreate gameID={this.state.selectedGameID} game={this.state.currentGame} />
                    </ModalBody>
                    <ModalFooter><ButtonBtn onClick={this.toggle}>Done</ButtonBtn></ModalFooter>
                </Modal>
                <div className="row">
                    <p>username: {this.state.username}</p>
                    <p>password: {this.state.password}</p>
                    <p>id: {this.state.adminID}</p>
                    <p>scores: {this.state.scores}</p>
                    <div className="col-md-6">
                        <h2>Current EduGames</h2>
                        {this.state.games.length ? (
                            <List>
                                {this.state.games.map(game => {
                                    return (
                                        <ListItem key={game._id}>
                                            <a href={"/games/" + game._id}>
                                                <h3>{game.name}</h3>
                                            </a>
                                            <BtnEdit id={game._id} click={this.editGame}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        ) : (
                                <h3>Create a game to begin</h3>
                            )}
                    </div>

                    <div className="col-md-6">
                        <div className="container createNewGame">
                            <h2>Create a Game</h2>
                            <form>
                                <Input
                                    value={this.state.newGameName}
                                    onChange={this.handleInputChange}
                                    name="newGameName"
                                    placeholder="Game Name"
                                />
                                <FormBtn
                                    disabled={!(this.state.newGameName)}
                                    onClick={this.createGame}
                                >
                                    Create
                                </FormBtn>
                            </form>
                        </div>

                        <div className="container highScore">
                            <h2>Student Progress</h2>

                            {/* show each student's high score depending on the game selected */}
                            <p> all student results will go in this container </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
