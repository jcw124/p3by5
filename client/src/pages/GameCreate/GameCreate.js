import React, { Component } from "react";
import Navigation from "../../components/Navigation";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";

require('./GameCreate.css');

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
            <div>
                <Navigation />
            <div className="gameCreateWrap">
                <div className="row">
                    <div className="col-lg-6">
                        <h1>Create Questions and Answers for: </h1>
                        <h5>Current Game Title</h5>
                        <form className="container">
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

                    <div className="currQuest col-lg-6">
                        <h1>Current Questions/Answers</h1>
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
            </div>
        )
    }
}

export default GameCreate;