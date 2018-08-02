import React from "react";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";

export const GameCreate = ({ questions, gameID, game }) =>
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
    (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <p>{gameID}</p>
                    <p>{game.name}</p>
                    <p>{questions}</p>
                    <h3>Create Questions and Answers for: </h3>
                    <h5>{game.name}</h5>
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
                        {questions.length ? (
                            <List>
                                {questions.map(question => {
                                    return (
                                        <ListItem key={question._id}>
                                        <h3>{question.question}</h3>
                                        <h4>Possible Answers</h4>
                                        {question.possibleAnswers.forEach(answer=>
                                            <p>{answer}</p>
                                        )}
                                            <BtnEdit id={game._id}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        ) : (
                                <h3>Create a question to begin</h3>
                            )}
                </div>
            </div>
        </div>
    )
