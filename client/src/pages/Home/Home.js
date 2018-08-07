import React, { Component } from "react";

class Home extends Component {
    render() {
        var message = "";

        if(this.props.authenticated)
        {
                 message = "IS AUTHENTICATED";
        }
        else{
                message = "NOOOOOOOOOOOOOOOOOO";
        }
        return (
            <div className="container">

                <h1>HELLO HOME WORLD </h1>


                <h1>{message}</h1>
                
            </div>
        )
    }
}

export default Home;