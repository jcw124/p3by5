import React from "react";
import {
    Form,
    FormGroup,
    Label, 
    Input,
    Button
} from 'reactstrap';
import "./Register.css";

const Register = () => (
    <div className="register">
        <h3>Create Account</h3>
        {/* <Form onSubmit={this.saveAndCont}> */}
        <Form>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input type="username" name="username" id="username" placeholder="Enter your full name" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Password" />
            </FormGroup>
            <FormGroup>
                <Label for="teacherName">Select Your Teacher</Label>
                <Input type="select" name="teacherName" id="teacherName">
                    <option>dummy1</option>
                    <option>dummy2</option>
                </Input>
            </FormGroup>
            <button type="submit" className="btn btn-primary">Create Account</button>
        </Form>
    </div>
);

export default Register;