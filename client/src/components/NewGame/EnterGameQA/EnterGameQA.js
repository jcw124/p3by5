import React from "react";
import {
    Form,
    FormGroup,
    Label, 
    Input,
    Button
} from 'reactstrap';
import "./EnterGame.css";


const EnterGameQA = () => (
    <div className="entergameqa">
        <h3>Dummy GAME NAME</h3>
        <Form>
            <FormGroup>
                <Label for="question">Question</Label>
                <Input type="question" name="question" id="question" placeholder="Question" />
            </FormGroup>
            <FormGroup>
                <Label for="correctAns">Correct Answer</Label>
                <Input type="correctAns" name="correctAns" id="correctAns" placeholder="Correct Answer" />
            </FormGroup>
            <FormGroup>
                <Label for="option">Other Options</Label>
                <Input className="options" type="option" name="option" id="option" placeholder="Option 1" />
                
                {/* <Label for="option">Option 3</Label> */}
                <Input className="options" type="option" name="option" id="option" placeholder="Option 2" />
            
                {/* <Label for="option">Option 4</Label> */}
                <Input className="options" type="option" name="option" id="option" placeholder="Option 3" />
            </FormGroup>
            <button type="submit" className="btn btn-primary">Add</button>
        </Form>
    </div>
);

export default EnterGameQA;