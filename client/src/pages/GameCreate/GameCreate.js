import React, { Component } from "react";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";

class GameCreate extends Component {
    // state = {
    //     Question: [],
    //     game.name: "",
    //     question: "",
    //     possibleAnswers: "",
    //     correctAnswer: ""
    // }

    // componentDidMount() {
    //     this.loadQA();
    // }

    // loadQA =() =>

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Create Questions and Answers for: </h3>
                        <h5>Dummy</h5>
                        <form>
                            <Input
                                // value={this.state.question}
                                // onChange={this.handleInputChange}
                                name="question"
                                placeholder="Question"
                            />
                            <Input 
                                // value={this.state.possibleAnswers}
                                // onChange={this.handleInputChange}
                                name="possibleAnswers"
                                placeholder="Possible Answer"
                            />
                            <Input 
                                // value={this.state.possibleAnswers}
                                // onChange={this.handleInputChange}
                                name="possibleAnswers"
                                placeholder="Possible Answer"
                            />
                            <Input 
                                // value={this.state.possibleAnswers}
                                // onChange={this.handleInputChange}
                                name="possibleAnswers"
                                placeholder="Possible Answer"
                            />
                            <Input 
                                // value={this.state.correctAnswer}
                                // onChange={this.handleInputChange}
                                name="correctAnswers"
                                placeholder="Correct Answer"
                            />
                            <FormBtn 
                                // disabled={!(
                                //     this.state.question && this.state.possibleAnswers && this.state.correctAnswer
                                // )}
                                // onClick={this.handleFormSubmit}
                            > 
                                Add Question
                            </FormBtn>
                        </form>    
                    </div>

                    <div className="col-md-6">
                        <h3>Current Questions/Answers</h3>
                        <List>
                            <ListItem>
                                {/* MAP */}
                                <BtnEdit onClick="">
                                    Edit
                                </BtnEdit>
                            </ListItem>
                        </List>
                            
                    </div>
                </div>
            </div>
        )
    }
}

export default GameCreate;