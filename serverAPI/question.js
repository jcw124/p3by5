const db = require('../models');

exports.getQuestion = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of user
    */
    db.Question.findById(req.params.id)
        .then(function (dbQuestion) {
            res.json(dbQuestion);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.saveQuestion = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.body syntax:
        {
            question: {question to be asked by the opponent}
            possibleAnswers: {array of possible answers to be displayed},
            correctAnswer: {correct answer of all possible answers}
            game: {associated game _id for this question}
        }
        */
    let newQuestion;
    db.Question.create(req.body)
        .then(function (dbQuestion) {
            newQuestion = dbQuestion;
            return db.Game.findOneAndUpdate({ _id: req.body.game }, { $push: { questions: dbQuestion._id } }, { new: true });
        })
        .then(function () {
            res.json(newQuestion);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.updateQuestion = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.body syntax:
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
            correctAnswer: req.body.correctAnswer
        }, { new: true })
        .then(function (dbQuestion) {
            res.json(dbQuestion);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.deleteQuestion = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of question to be removed
    */
    let game;

    db.Question.findById(req.params.id)
        .then(function (dbQuestion) {
            game = dbQuestion.game;
            db.Game.findById(dbQuestion.game, "questions")
                .then(function (result) {
                    const newQuestions = [];
                    result.questions.forEach(id => {
                        if (id == req.params.id) {
                            db.Question.findByIdAndRemove(id)
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    return res.json(err);
                                });;
                        }
                        else newQuestions.push(id);
                    });
                    db.Game.findByIdAndUpdate(game, { questions: newQuestions }, { new: true })
                        .then(function (result) {
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