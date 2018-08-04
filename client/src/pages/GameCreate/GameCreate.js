import React from "react";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import BtnEdit from "../../components/BtnEdit";

export const GameCreate = ({ questions, gameID, game, currentQuestion, currentAnswer1, currentAnswer2, currentAnswer3, currentCorrect, handleInputChange, addQuestion }) =>
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <p>{gameID}</p>
                <p>{game.name}</p>
                <p>{questions}</p>
                <h3>Create Questions and Answers for: </h3>
                <h5>{game.name}</h5>
                <p>{currentQuestion}</p>
                <p>{currentAnswer1}</p>
                <p>{currentAnswer2}</p>
                <p>{currentAnswer3}</p>
                <p>{currentCorrect}</p>
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
                                    {question.possibleAnswers.forEach(answer =>
                                        <p>{answer}</p>
                                    )}
                                    <BtnEdit id={game._id} />
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