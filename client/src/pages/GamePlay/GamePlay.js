import React, { Component } from "react";
import Questions from "../../components/Questions";
import Answers from "../../components/Answers";
import ButtonBtn from "../../components/ButtonBtn";

class GamePlay extends Component {
    //Setting initial state
    state = {
        gameID:"",
        gameName:"",
    }

    componentDidMount(){
        // let session=sessionStorage.getItem("gameID");
        this.setState({ gameID: sessionStorage.getItem("gameID")});
        console.log("from session storage",sessionStorage.getItem("gameID")); 
        console.log("load!!!", this.state.gameID);
    }

    render() {

        console.log('game pla loaded')
        return (
            <div className="container">
                <p>Clicked game: {this.state.gameID}</p>
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