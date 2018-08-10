import React from "react";
import Navigation from "../../components/Navigation";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";
import "./GameCreate.css"

export const GameCreate = ({ questions, gameID, game, currentQuestion, currentAnswer1, currentAnswer2, currentAnswer3,
    currentCorrect, handleInputChange, addQuestion, removeQuestion, loadEdit, editQuestion,
    updateQuestion, updateAnswer1, updateAnswer2, updateAnswer3, updateCorrect, updateID }) =>
    <div className="gameCreateWrap">
        <div className="row">
            <div className="col-lg-6">
                <h3>Create Question</h3>
                <h5>{game.name}</h5>
                <form className="container">
                    <textarea
                        className="form-control"
                        rows="3"
                        value={currentQuestion}
                        onChange={handleInputChange}
                        name="currentQuestion"
                        placeholder="Question">
                    </textarea>
                    <Input
                        value={currentAnswer1}
                        onChange={handleInputChange}
                        name="currentAnswer1"
                        placeholder="Possible Answer"
                    />
                    <Input
                        value={currentAnswer2}
                        onChange={handleInputChange}
                        name="currentAnswer2"
                        placeholder="Possible Answer"
                    />
                    <Input
                        value={currentAnswer3}
                        onChange={handleInputChange}
                        name="currentAnswer3"
                        placeholder="Possible Answer" />
                    <Input
                        value={currentCorrect}
                        onChange={handleInputChange}
                        name="currentCorrect"
                        placeholder="Correct Answer"
                    />
                    <FormBtn
                        disabled={!(currentQuestion !== "" && (currentAnswer1 !== "" || currentAnswer2 !== "" || currentAnswer3 !== "") && currentCorrect !== "")}
                        onClick={addQuestion}>
                        Add Question</FormBtn>
                </form>
                <h3>Edit Question</h3>
                <form>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={updateQuestion}
                        onChange={handleInputChange}
                        name="updateQuestion"
                        placeholder="Question"
                    ></textarea>
                    <Input
                        value={updateAnswer1}
                        onChange={handleInputChange}
                        name="updateAnswer1"
                        placeholder="Possible Answer"
                    />
                    <Input
                        value={updateAnswer2}
                        onChange={handleInputChange}
                        name="updateAnswer2"
                        placeholder="Possible Answer"
                    />
                    <Input
                        value={updateAnswer3}
                        onChange={handleInputChange}
                        name="updateAnswer3"
                        placeholder="Possible Answer" />
                    <Input
                        value={updateCorrect}
                        onChange={handleInputChange}
                        name="updateCorrect"
                        placeholder="Correct Answer"
                    />
                    <FormBtn
                        className="edit-btn"
                        id={updateID}
                        disabled={!(updateQuestion !== "" && (updateAnswer1 !== "" || updateAnswer2 !== "" || updateAnswer3 !== "") && updateCorrect !== "")}
                        onClick={editQuestion}>
                        Submit Edit
                    </FormBtn>
                </form>
            </div>
            <div className="currQuest col-lg-6">
                <h3>Current Questions/Answers</h3>
                {questions.length ? (
                    <List>
                        {questions.map(question => {
                            return (
                                <div key={question._id} className="card">
                                    <div className="card-body">
                                        <ListItem key={question._id}>
                                            <h5>{question.question}?</h5>
                                            <h4>Possible Answers</h4>
                                            {
                                                question.possibleAnswers.map((answer, i) =>
                                                    <p className="options" key={i}>{i + 1}. {answer}</p>
                                                )}
                                            <p>Correct Answer: {question.correctAnswer}</p>
                                            <div className="btn-group">
                                                <button className="edit-btn btn-primary mx-auto" id={question._id} onClick={loadEdit}>Edit</button>
                                                <button className="btn btn-danger mx-auto" id={question._id} onClick={removeQuestion}>Remove</button>
                                            </div>
                                        </ListItem>
                                    </div>
                                </div>
                            );
                        })}
                    </List>
                ) : (
                        <h3>Create a question to begin</h3>
                    )}
            </div>
        </div>
    </div>
