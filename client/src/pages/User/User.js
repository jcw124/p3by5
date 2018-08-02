import React, {Component} from "react";
import { gameAPI } from "../../utils/API";
import ButtonBtn from "../../components/ButtonBtn";
import { List, ListItem } from "../../components/List";

class User extends Component {

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
                                            <ButtonBtn onClick=""> 
                                                Play
                                            </ButtonBtn>
                                        </ListItem>   
                                    );
                                })}
                            </List> 
                        ): (
                            <h3>There are currently no games</h3>
                        )}
                    </div>

                    <div className="col-md-6">
                        <div className="container highScore">
                            <h2> Your Score</h2>
                            {/* show each student's high score depending on the game selected */}
                            <p> the student's score will go in this container </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;