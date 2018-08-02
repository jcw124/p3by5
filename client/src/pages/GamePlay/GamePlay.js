import React, { Component } from "react";
import Questions from "../../components/Questions";
import Answers from "../../components/Answers";
import ButtonBtn from "../../components/ButtonBtn";










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
                        <ButtonBtn>
                            Play Again
                        </ButtonBtn>
                    </div>
                    <div className="col-md-4">
                        <ButtonBtn>
                            Play
                        </ButtonBtn>
                    </div>
                    <div className="col-md-4">
                        <ButtonBtn>
                            Home
                        </ButtonBtn>
                    </div>

                </div>
            </div>
        )
    }
}

export default GamePlay;