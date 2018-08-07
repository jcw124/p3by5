import React, {Component} from "react";
import { gameAPI } from "../../utils/API";
import ButtonBtn from "../../components/ButtonBtn";
import { List, ListItem } from "../../components/List";
import Navigation from "../../components/Navigation";


require('./User.css');

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
            <div>
            <Navigation />
            <div className="UserWrap">
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
                                                <ButtonBtn onClick=""> 
                                                    Play
                                                </ButtonBtn>
                                            </ListItem>   
                                        );
                                    })}
                                </List> 
                            ): (
                                <h5>There are currently no games</h5>
                            )}
                        </div>
                    </div>

                    <div className="YourScore col-lg-6">
                            <h1> Your Score</h1>
                        <div className="container highScore">
                            {/* show each student's high score depending on the game selected */}
                            <p> the student's score will go in this container </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default User;