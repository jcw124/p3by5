import React from "react";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";

export const GameCreate = ({ questions, gameID, game, currentQuestion, currentAnswer1, currentAnswer2, currentAnswer3,
    currentCorrect, handleInputChange, addQuestion, removeQuestion, loadEdit, editQuestion,
    updateQuestion, updateAnswer1, updateAnswer2, updateAnswer3, updateCorrect, updateID }) =>
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <h3>Create Questions and Answers for: </h3>
                <h5>{game.name}</h5>
                <form>
                    <Input
                        value={currentQuestion}
                        onChange={handleInputChange}
                        name="currentQuestion"
                        placeholder="Question"
                    />
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
                        click={addQuestion}
                        text="Add Question"
                    />
                </form>
                <h3>Edit Question: </h3>
                <form>
                    <Input
                        value={updateQuestion}
                        onChange={handleInputChange}
                        name="updateQuestion"
                        placeholder="Question"
                    />
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
                    <button
                        className="edit-btn btn-primary"
                        id={updateID}
                        disabled={!(updateQuestion !== "" && (updateAnswer1 !== "" || updateAnswer2 !== "" || updateAnswer3 !== "") && updateCorrect !== "")}
                        onClick={editQuestion}>
                        Submit Edit
                    </button>
                </form>
            </div>

            <div className="col-md-6">
                <h3>Current Questions/Answers</h3>
                {questions.length ? (
                    <List>
                        {questions.map(question => {
                            return (
                                <ListItem key={question._id}>
                                    <h3>{question.question}?</h3>
                                    <h4>Possible Answers</h4>
                                    {
                                        question.possibleAnswers.map((answer, i) =>
                                            <p key={i}>Choice {i + 1}: {answer}</p>
                                        )}
                                    <p>Correct Answer: {question.correctAnswer}</p>
                                    <button className="edit-btn btn-primary" id={question._id} onClick={loadEdit}>Edit</button>
                                    <button className="btn btn-danger" id={question._id} onClick={removeQuestion}>Remove Question</button>
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