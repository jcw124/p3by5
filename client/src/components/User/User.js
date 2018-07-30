import React, { Component } from "react";
import { AssignedGame, AssignedGameItem } from "./AssignedGame";
import { HighScore, HighScoreItem } from "./HighScore";

class App extends Component {
    render() {
        return(
            <div>
                <h3>Student Section</h3>
                <AssignedGame>
                    <AssignedGameItem />
                </AssignedGame>
                <HighScore>
                    <HighScoreItem />
                </HighScore>
            </div>
        )
    }
}

export default App;