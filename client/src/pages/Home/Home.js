import React, { Component } from "react";
import ButtonBtn from "../../components/ButtonBtn";
import logo from "../../images/logosm.svg";

require('./Home.css');

class Home extends Component {
    render() {
        var message = "";

        if(this.props.authenticated)
        {
                 message = "IS AUTHENTICATED";
        }
        else{
                message = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source";
        }
        return (
            <div className="homeWrap">
                <div className="homeContain">
                    <div className="homeLogo">
                        <img alt="logo" src={logo} />
                    </div>
                    {/* <h1>HELLO HOME WORLD </h1> */}
                    <h3>{message}</h3>
                    <ButtonBtn>PLAY</ButtonBtn>
                </div>
            </div>
        )
    }
}

export default Home;