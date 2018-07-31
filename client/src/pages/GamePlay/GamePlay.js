import React, { Component } from "react";
import Questions from "../../components/Questions";
import Answers from "../../components/Answers";
import { Again, Play, Home } from "../../components/Btn";

class GamePlay extends Component {
    render() {
        return (
            <div className="container">
                <div className="game">
                    <Questions />
                    <Answers />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Again>
                            Play Again
                        </Again>
                    </div>
                    <div className="col-md-4">
                        <Play>
                            Play
                        </Play>
                    </div>
                    <div className="col-md-4">
                        <Home>
                            Home
                        </Home>
                    </div>

                </div>
            </div>
        )
    }
}

export default GamePlay;