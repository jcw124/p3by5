import React from "react";
import {
    Form,
    FormGroup,
    Label, 
    Input,
    Button
} from 'reactstrap';
import"./NewGameName.css";


const NewGameName = () => (
    <div className="newgamename">
        <h3>Game Name</h3>
        <Form>
            <FormGroup>
                <Input type="gameName" name="gameName" id="gameName" placeholder="What do you want to call this game?" />
            </FormGroup>
            <button type="submit" className="btn btn-primary">Create Game</button>
        </Form>
    </div>
);

export default NewGameName;