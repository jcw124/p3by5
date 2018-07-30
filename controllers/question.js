const db = require('../models');

exports.getQuestion = function (req, res) {
    /*req.body syntax:
    {
        id: {id of question},
    }
    */
    console.log(req.body);
    db.Question.findById(req.body.id)
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
        }
            req.params.gameID is the associated game _id for this question
        */
    req.body.game = req.params.gameID;
    db.Question.create(req.body)
        .then(function (dbQuestion) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Game.findOneAndUpdate({ _id: req.params.gameID }, { $push: { questions: dbQuestion._id } }, { new: true });
        })
        .then(function (dbGame) {
            // If we were able to successfully update an Article, send it back to the client
            res.json("Updated Game:", dbGame);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
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
    db.Question.findOneAndUpdate({ _id: req.body.id },
        {
            $set: {
                question: req.body.question,
                possibleAnswers: req.body.possibleAnswers,
                correctAnswers: req.body.correctAnswers
            }
        })
        .then(function (dbQuestion) {
            // If we were able to successfully update an Article, send it back to the client
            res.json("Updated Question:", dbQuestion);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
}

exports.deleteQuestion = function (req, res) {
    /*req.body syntax:
    {
        question: {_id of question we want to delete},
        game: {_id of associated game}
    }
    */
    const question = req.body.question, game = req.body.game;

    db.Game.findById(game, "questions")
        .then(function (result) {
            const newQuestions = [];
            console.log("target questions:", result);
            result.highScores.forEach(id => {
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
        });;
}