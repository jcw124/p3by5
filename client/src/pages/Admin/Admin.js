import React, { Component } from "react"
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import EditBtn from "../../components/EditBtn";
import { Input, FormBtn } from "../../components/Form";


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
        API.getGames()
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
    HandleFormSubmit = event => {
        event.preventDefault();
        if(this.state.name) {
            API.saveGameName({
                name: this.state.name
            }).then(res => this.loadGames()
            ).catch(err=> console.log(err));
        }
    };

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Current EduGames</h2>
                        {this.state.games.length ? (
                            <List>
                                {this.state.games.map (game => {
                                    return (
                                        <ListItem key={game._id}>
                                            <a href={"/games/" + game._id}>
                                                <h3>{game.name}</h3> 
                                            </a>
                                            <EditBtn onClick={() => this.editGame(game._id)} />
                                        </ListItem>   
                                    );
                                })}
                            </List> 
                        ): (
                            <h3>Create a game to begin</h3>
                        )}
                    </div>

                    <div className="col-md-6">
                        <div className="container createNewGame">
                            <h2>Create a Game</h2>
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