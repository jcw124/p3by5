import React, { Component } from "react";
import Navigation from "../../components/Navigation";
import {gameAPI} from "../../utils/API";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";
import { Input, FormBtn } from "../../components/Form";


require('./Admin.css');


//Admin page contains 
//new game button to create a new game 
//list container listing all the games
//student high scores - when screen load, show highscore of first game in list 

class Admin extends Component {
    // Setting inital state
    state = {
        games: [],
        name: "",
        highScores: ""
    };

    //load into gamelist container existing games 
    componentDidMount() {
        this.loadGames();
    }

    loadGames = () => {
        gameAPI.getGame()
            .then(res =>
                this.setState({ 
                    games: res.data,
                    name: "",
                    highScores: ""
                })
            ).catch(err => console.log(err));
    };
    
    //Entering a new game name
    handleInputChange = event => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //submit new game name 
    //render new game name on page in game container 
    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.name) {
            gameAPI.saveGame({
                name: this.state.name
            }).then(res => this.loadGames()
            ).catch(err=> console.log(err));
        }
    };

    render() {
        return(
            <div>
            <Navigation />
            <div className="AdminWrap">
                <div className="row">
                    <div className="col-lg-6">
                        <h1>Current EduGames</h1>
                        <div className="container">
                            {this.state.games.length ? (
                                <List>
                                    {this.state.games.map (game => {
                                        return (
                                            <ListItem key={game._id}>
                                                <a href={"/games/" + game._id}>
                                                    <h3>{game.name}</h3> 
                                                </a>
                                                <BtnEdit onClick={() => this.editGame(game._id)} />
                                            </ListItem>   
                                        );
                                    })}
                                </List> 
                            ): (
                                <h5>Create a game to begin</h5>
                            )}
                        </div>
                    </div>

                    <div className="createGame col-lg-6">
                            <h1>Create a Game</h1>
                        <div className="container createNewGame">
                            <form>
                                <Input 
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    name="name"
                                    placeholder="Game Name"
                                />
                                <FormBtn    
                                    disabled={!(this.state.name)}
                                    onClick={this.HandleFormSubmit}
                                >
                                    Create
                                </FormBtn>
                            </form>
                        </div>

                        <div className="container highScore">
                            <h5>Student Progress</h5>
                            
                            {/* show each student's high score depending on the game selected */}
                            <p> all student results will go in this container </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Admin;
