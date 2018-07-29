import React from "react";
import {
    Form,
    FormGroup,
    Label, 
    Input,
    Button
} from 'reactstrap';


const EnterGameQA = () => (
    <div className="container">
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
                <Label for="option">Option 2</Label>
                <Input type="option" name="option" id="option" placeholder="Option" />
            </FormGroup>
            <FormGroup>
                <Label for="option">Option 3</Label>
                <Input type="option" name="option" id="option" placeholder="Option" />
            </FormGroup>
            <FormGroup>
                <Label for="option">Option 4</Label>
                <Input type="option" name="option" id="option" placeholder="Option" />
            </FormGroup>
            <Button type="submit">Add</Button>
        </Form>
    </div>
);

export default EnterGameQA;