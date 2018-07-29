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
            game: {_id of associated game}
        }
        */
    db.Question.create(req.body)
        .then(function (dbQuestion) {
            // View the added result in the console
            console.log("New Question:", dbQuestion);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
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

const db = require('../models');

exports.getScore = function (req, res) {
    /*req.body syntax:
    {
        gameID: {mongoose schema id of associated game},
        name: {name of user associated with given score}
    }
    */
    console.log(req.body);
    db.Score.find({
        game: req.body.gameID,
        name: req.body.name
    })
        .sort({ score: -1 })
        .then(function (dbScores) {
            // If we were able to successfully find an Headline with the given id, send it back to the client
            console.log("Scores:", dbScores);
            res.json(dbScores);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
}

exports.saveScore = function (req, res) {
    /*req.body syntax:
    {
        score: {score of game just completed}
        name: {name of user associated with given score},
        game: {mongoose schema id of associated game}
    }
    */
    db.Score.create(req.body)
        .then(function (dbScore) {
            // View the added result in the console
            console.log(dbScore);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.deleteScore = function (req, res) {
    /*req.body syntax:
    {
        score: {_id of score we want to delete},
        game: {_id of associated game}
    }
    */
    const score = req.body.score, game = req.body.game;

    db.Game.findById(game, "highScores").then(function (result) {
        const newScores = [];
        console.log("target scores:", result);
        result.highScores.forEach(id => {
            if (id == score) {
                db.Score.findByIdAndRemove(id).then(function (removed) {
                    console.log("Removed:", removed);
                });
            }
            else newScores.push(id);
        });
        console.log("New Scores Array:", newScores);
        db.Games.findByIdAndUpdate(game, { highScores: newScores }).then(function (result) {
            console.log("Updated Game:", result);
            res.json(result);
        })
    });
}