import React from "react";
import {
    Form,
    FormGroup,
    Label, 
    Input,
    Button
} from 'reactstrap';


const NewGameName = () => (
    <div className="container">
        <Form>
            <FormGroup>
                <Label for="gameName">Game Name</Label>
                <Input type="gameName" name="gameName" id="gameName" placeholder="What do you want to call this game?" />
            </FormGroup>
            <Button type="submit">Create Game</Button>
        </Form>
    </div>
);

export default NewGameName;