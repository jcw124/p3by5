import React, { Component } from "react";
import NewGameBtn from "./NewGameBtn";
import { GameList, GameListItem } from "./GameList";

class App extends Component {
    render() {
        return(
            <div>
                <NewGameBtn />
                <GameList>
                    <GameListItem />
                </GameList>
            </div>
        )
    }
}

export default App;