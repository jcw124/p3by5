const db = require('../models');

exports.getQuestion = function (req, res) {
    /*
        req.params gives _id of user
    */
    console.log(req.body);
    db.Question.findById(req.params.id)
        .then(function (dbQuestion) {
            console.log("Question:", dbQuestion);
            res.json(dbQuestion);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.saveQuestion = function (req, res) {
    /*req.body syntax:
        {
            question: {question to be asked by the opponent}
            possibleAnswers: {array of possible answers to be displayed},
            correctAnswers: {correct answer of all possible answers}
            game: {associated game _id for this question}
        }
        */
    db.Question.create(req.body)
        .then(function (dbQuestion) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Game.findOneAndUpdate({ _id: req.body.game }, { $push: { questions: dbQuestion._id } }, { new: true });
        })
        .then(function (dbGame) {
            // If we were able to successfully update an Article, send it back to the client
            res.json("Updated Game:", dbGame);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.updateQuestion = function (req, res) {
    /*req.body syntax:
        {
            id: {_id of question to be updated}
            question: {question to be asked by the opponent}
            possibleAnswers: {array of possible answers to be displayed},
            correctAnswers: {correct answer of all possible answers}
        }
        */
    db.Question.findByIdAndUpdate(req.body.id,
        {
            question: req.body.question,
            possibleAnswers: req.body.possibleAnswers,
            correctAnswers: req.body.correctAnswers
        })
        .then(function (dbQuestion) {
            // If we were able to successfully update an Article, send it back to the client
            res.json("Updated Question:", dbQuestion);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.deleteQuestion = function (req, res) {
    /*
        req.params gives _id of question to be removed
    */

    db.Question.findById(req.params.id)
        .then(function (dbQuestion) {
            db.Game.findById(dbQuestion.game, "questions")
                .then(function (result) {
                    const newQuestions = [];
                    console.log("target questions:", result);
                    result.questions.forEach(id => {
                        if (id == question) {
                            db.Question.findByIdAndRemove(id)
                                .then(function (removed) {
                                    console.log("Removed:", removed);
                                })
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    return res.json(err);
                                });;
                        }
                        else newQuestions.push(id);
                    });
                    console.log("New Questions Array:", newQuestions);
                    db.Games.findByIdAndUpdate(game, { questions: newQuestions })
                        .then(function (result) {
                            console.log("Updated Game:", result);
                            res.json(result);
                        })
                        .catch(function (err) {
                            // If an error occurred, send it to the client
                            return res.json(err);
                        });
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}