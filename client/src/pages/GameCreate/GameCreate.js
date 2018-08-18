import React, { Component } from "react"
import { Input, FormBtn } from "../../components/Form";
import "./GameCreate.css"


class GameCreate extends Component {
    // Setting inital state
    constructor(props) {
        super(props);
        this.state = {
            gameIndex: 0,
        };
    }



    // export const GameCreate = ({ questions, gameID, game, currentQuestion, currentAnswer1, currentAnswer2, currentAnswer3,
    //     currentCorrect, handleInputChange, addQuestion, removeQuestion, loadEdit, editQuestion,
    //     updateQuestion, updateAnswer1, updateAnswer2, updateAnswer3, updateCorrect, updateID }) =>
    render() {
        return (<div className="gameCreateWrap">
            <div className="row">
                <div className="col-lg-6">
                    {this.props.showEdit ? (
                        <div>
                            <h3>Edit Question</h3>
                            <form className="container">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={this.props.updateQuestion}
                                    onChange={this.props.handleInputChange}
                                    name="updateQuestion"
                                    placeholder="Question"
                                ></textarea>
                                <Input
                                    value={this.props.updateAnswer1}
                                    onChange={this.props.handleInputChange}
                                    name="updateAnswer1"
                                    placeholder="Possible Answer"
                                />
                                <Input
                                    value={this.props.updateAnswer2}
                                    onChange={this.props.handleInputChange}
                                    name="updateAnswer2"
                                    placeholder="Possible Answer"
                                />
                                <Input
                                    value={this.props.updateAnswer3}
                                    onChange={this.props.handleInputChange}
                                    name="updateAnswer3"
                                    placeholder="Possible Answer" />
                                <Input
                                    value={this.props.updateCorrect}
                                    onChange={this.props.handleInputChange}
                                    name="updateCorrect"
                                    placeholder="Correct Answer"
                                />
                                <FormBtn
                                    className="edit-btn"
                                    id={this.props.updateID}
                                    disabled={!(this.props.updateQuestion !== "" && (this.props.updateAnswer1 !== "" || this.props.updateAnswer2 !== "" || this.props.updateAnswer3 !== "") && this.props.updateCorrect !== "")}
                                    onClick={this.props.editQuestion}>
                                    Submit Edit
                                </FormBtn>
                            </form>
                        </div>) : (
                            <div>
                                <h3>Create Question</h3>
                                <form className="container">
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={this.props.currentQuestion}
                                        onChange={this.props.handleInputChange}
                                        name="currentQuestion"
                                        placeholder="Question">
                                    </textarea>
                                    <Input
                                        value={this.props.currentAnswer1}
                                        onChange={this.props.handleInputChange}
                                        name="currentAnswer1"
                                        placeholder="Possible Answer"
                                    />
                                    <Input
                                        value={this.props.currentAnswer2}
                                        onChange={this.props.handleInputChange}
                                        name="currentAnswer2"
                                        placeholder="Possible Answer"
                                    />
                                    <Input
                                        value={this.props.currentAnswer3}
                                        onChange={this.props.handleInputChange}
                                        name="currentAnswer3"
                                        placeholder="Possible Answer" />
                                    <Input
                                        value={this.props.currentCorrect}
                                        onChange={this.props.handleInputChange}
                                        name="currentCorrect"
                                        placeholder="Correct Answer"
                                    />
                                    <FormBtn
                                        disabled={!(this.props.currentQuestion !== "" && (this.props.currentAnswer1 !== "" || this.props.currentAnswer2 !== "" || this.props.currentAnswer3 !== "") && this.props.currentCorrect !== "")}
                                        onClick={this.props.addQuestion}>
                                        Add Question</FormBtn>
                                </form>
                            </div>)}
                </div>
                <div className="currQuest col-lg-6">
                    <h3>Current Question</h3>
                    {this.props.questionDisplay ? (
                        <div key={this.props.questionDisplay._id}>
                            <div className="card-body">
                                <h5>{this.props.questionDisplay.question}?</h5>
                                <p className="question-heading">Possible Answers:</p>
                                {
                                    this.props.questionDisplay.possibleAnswers.map((answer, i) =>
                                        <p className="options" key={i}>{i + 1}. {answer}</p>
                                    )}
                                <p className="question-heading">Correct Answer:</p>
                                <p className="options">{this.props.questionDisplay.correctAnswer}</p>
                                <div className="btn-group">
                                    <button className="question-btn edit-btn btn-primary" id={this.props.questionDisplay._id} onClick={this.props.loadEdit}>Edit</button>
                                    <button className="question-btn btn btn-danger" id={this.props.questionDisplay._id} onClick={this.props.removeQuestion}>Remove</button>
                                </div>
                            </div>
                            <h2><i className="fas fa-arrow-alt-circle-left" onClick={this.props.lastQuestion}></i>{this.props.questionIndex + 1} of {this.props.questions.length}<i className="fas fa-arrow-alt-circle-right" onClick={this.props.nextQuestion}></i></h2>
                        </div>
                    ) : (
                            <h3>Create a question to begin</h3>
                        )}
                </div>
            </div>
        </div>
        );
    }
}

export default GameCreate;