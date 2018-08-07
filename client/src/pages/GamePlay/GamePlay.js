import React, { Component } from "react";
import Navigation from "../../components/Navigation";
import Questions from "../../components/Questions";
import Answers from "../../components/Answers";
import ButtonBtn from "../../components/ButtonBtn";
import Animation from "../../components/Animation";
import teacherProfile from "../../images/user1profile.svg";
import { walkright } from '../../components/Animation'

require('./GamePlay.css');





class GamePlay extends Component {



    




    render() {
        return (
            <div>
            <Navigation />
            <div className="container gameContainer">
                <div className="game">
                    <div className="QandA">
                        <Questions />
                        <div className="user">
                            <img alt="teacher_icon" src={teacherProfile} />
                        </div>
                        <Answers />
                    </div>
                    <Animation />
                </div>
                <div className="footer">
                        <ButtonBtn>
                            Play Again
                        </ButtonBtn>
                        <ButtonBtn>
                            Play
                        </ButtonBtn>
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