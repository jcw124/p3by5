import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import { adminAPI, gameAPI, userAPI, scoreAPI } from "../../utils/API";
import ButtonBtn from "../../components/ButtonBtn";
import { List, ListItem } from "../../components/List";
import Play from "../GamePlay";
import { FormBtn } from "../../components/Form";
import Navigation from "../../components/Navigation";

require('./User.css');

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: "",
            username: "",
            adminID: "",
            games: [],
            selectedGameID: "",
            gameScores: "",
            scores: [],
            selectedGame: {},
            gameName: "",
            gameQuestions: "",
            gameAnswers: ""
        };
    }

    static contextTypes = {
        router: PropTypes.object,
    }

    componentDidMount() {
        if ((sessionStorage.getItem('userAuth') === 'yes') && sessionStorage.getItem("userUsername")) {
            if (sessionStorage.getItem("adminID")) {
                this.setState({
                    adminID: sessionStorage.getItem("adminID"),
                    username: sessionStorage.getItem('userUsername')
                });
            }
            this.getUserId(sessionStorage.getItem('userUsername'));
            if (!sessionStorage.getItem(`gameCounter${sessionStorage.getItem("gameID")}`)) {
                sessionStorage.removeItem(`numWrong${sessionStorage.getItem("gameID")}`);
                sessionStorage.removeItem(`numCorrect${sessionStorage.getItem("gameID")}`);
            }
        }
    }

    getUserId = userUsername => {
        userAPI.getUser(userUsername)
            .then(res => {
                console.log("get username", res);
                this.setState({ userID: res.data._id });
                this.loadGames();
            })
            .catch(err => console.log(err));
    }

    loadGames = () => {
        adminAPI.getGamesbyAdminID(this.state.adminID)
            .then(res => {
                console.log("game id", this.state.adminID);
                this.setState({ games: res.data })
                console.log("games", res.data);
            })
            .catch(err => console.log(err));
    }

    loadScores = event => {
        event.preventDefault();
        this.setState({ gameScores: event.target.name });
        scoreAPI.getScore(event.target.getAttribute("id"))
            .then(res => this.setState({ scores: res.data }))
            .catch(err => console.log(err));
    }

    playGame = event => {
        event.preventDefault();
        sessionStorage.setItem("gameID", event.target.getAttribute("id"));
        sessionStorage.setItem("userID", this.state.userID);
        this.context.router.history.push("/play");
    }


    logout = () => {
        this.props.deAuthenticate();
        sessionStorage.removeItem(`numCorrect${sessionStorage.getItem("gameID")}`);
        sessionStorage.removeItem(`numWrong${sessionStorage.getItem("gameID")}`);
        sessionStorage.removeItem(`gameCounter${sessionStorage.getItem("gameID")}`);
        sessionStorage.removeItem("userAuth");
        sessionStorage.removeItem("userUsername");
        sessionStorage.removeItem("adminID");
        sessionStorage.removeItem("userID");
        window.location.reload();
    }

    render() {
        return (!(sessionStorage.getItem("userAuth") === 'yes') ?
            <Redirect to={{ pathname: '/login' }} /> :
            <div>
                <Navigation />
                <div className="UserWrap">
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>Current EduGames</h1>
                            <div className="container">
                                {this.state.games.length ? (
                                    <List>
                                        {this.state.games.map(game => {
                                            if (game.questions.length)
                                                return (
                                                    <ListItem key={game._id}>
                                                        <h3>{game.name}</h3>
                                                        <ButtonBtn
                                                            id={game._id}
                                                            name={game.name}
                                                            onClick={this.loadScores}>
                                                            High Score
                                                </ButtonBtn>
                                                        <ButtonBtn
                                                            id={game._id}
                                                            name={game.name}
                                                            onClick={this.playGame}>
                                                            Play
                                                </ButtonBtn>
                                                    </ListItem>
                                                );
                                        })}
                                    </List>
                                ) : (
                                        <h3>There are currently no games</h3>
                                    )}
                            </div>
                        </div>

                        <div className="YourScore col-lg-6">
                            <h1> Your Score</h1>
                            <div className="container highScore">
                                <h3> Your Score</h3>
                                <h4>{this.state.gameScores}</h4>
                                {this.state.scores.length ? (
                                    <List>
                                        {this.state.scores.map(score =>
                                            <ListItem key={score.id}>
                                                <p>{score.score}</p>
                                            </ListItem>
                                        )}
                                    </List>
                                ) : (
                                        <h4>No Scores for this Game Yet</h4>
                                    )}
                            </div>
                        </div>
                        <FormBtn onClick={this.logout}>logout</FormBtn>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;