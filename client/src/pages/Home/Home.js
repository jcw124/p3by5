import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ButtonBtn from "../../components/ButtonBtn";
import logo from "../../images/logosm.svg";
import './Home.css';

class Home extends Component {

    logout = () => {
        this.props.deAuthenticate();
        sessionStorage.removeItem("userAuth");
        sessionStorage.removeItem("userUsername");
        sessionStorage.removeItem("adminID");
        window.location.reload();
    }


    render() {
        var message = "WELCOME";

        if (sessionStorage.getItem('userAuth')==='yes') {
            return (
                <div className="homeWrap">
                    <div className="homeContain">
                        <div className="homeLogo">
                            <img alt="logo" src={logo} />
                        </div>
                        {/* <h1>HELLO HOME WORLD </h1> */}
                        <h3>{message}</h3>
                        <ButtonBtn><Link to={"/user"}>PLAY</Link></ButtonBtn>
                        <ButtonBtn onClick={this.logout}>LOGOUT</ButtonBtn>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="homeWrap">
                    <div className="homeContain">
                        <div className="homeLogo">
                            <img alt="logo" src={logo} />
                        </div>
                        {/* <h1>HELLO HOME WORLD </h1> */}
                        <h3>{message}</h3>
                        <ButtonBtn><Link to={"/login"}>LOGIN</Link></ButtonBtn>
                        <ButtonBtn><Link to={"/register"}>REGISTER</Link></ButtonBtn>
                    </div>
                </div>
            )
        }

    }
}

export default Home;