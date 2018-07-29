import React, { Component } from "react";
import NewGameBtn from "./NewGameBtn";
import { GameList, GameListItem } from "./GameList";
import { Scoreboard, ScoreboardItem } from "./Scoreboard";
import ProgressBtn from "./ProgressBtn";
import Edit from "./Edit";

class App extends Component {
    render() {
        return(
            <div>
                <NewGameBtn />
                <GameList>
                    <GameListItem />
                    <ProgressBtn />
                    <Edit />
                </GameList>
                <Scoreboard>
                    <ScoreboardItem />
                </Scoreboard>
            </div>
        )
    }
}

export default App;