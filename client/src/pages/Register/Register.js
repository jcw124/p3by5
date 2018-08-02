import React, { Component } from "react";
import { Input, Label, DropDown } from "../../components/Form";
import ButtonBtn from "../../components/ButtonBtn";

class Register extends Component {
    render() {
        return (
            <div className="container">
                <h3>Create Account</h3>
                <form>
                    <Label 
                        for="username"> 
                        Username
                    </Label>
                    <Input 
                        placeholder="Enter your full name" />
                   
                    <Label 
                        for="password"> 
                        Password
                    </Label>
                    <Input 
                        placeholder="Password" />
                    
                    <Label 
                        for="confirmPassword"> 
                        Confirm Password
                    </Label>
                    <Input 
                        placeholder="Password" />
                    
                    <Label 
                        for="teacher"> 
                        Select your Teacher
                    </Label>
                    <DropDown 
                        type="select">
                        <option> Teacher 1 </option>
                    </DropDown>
                    <ButtonBtn>
                        Register
                    </ButtonBtn>

                </form>
            </div>
        )
    }
}

export default Register;