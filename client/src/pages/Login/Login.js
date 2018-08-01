import React, { Component } from "react";
import { Input } from "../../components/Form";
import ButtonBtn from "../../components/ButtonBtn";

class Login extends Component {
    render() {
        return (
            <div className="container">
                <h3> Login or Register </h3>
                <form> 
                    <Input
                        placeholder="Username" />
                    <Input 
                        placeholder="Password" />
                    <ButtonBtn>
                        Login
                    </ButtonBtn>
                    <ButtonBtn>
                        Register
                    </ButtonBtn>
                </form>    
            </div>
        )
    }
}

export default Login