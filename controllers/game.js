const db = require('../models');

exports.getGame = function (req, res) {
    /*req.body syntax:
    {
        id: {_id of game},
    }
    */
    db.Game.findById(req.body.id)
        .populate("questions")
        .populate("scores")
        .then(function (dbGame) {
            console.log("Game:", dbGame);
            res.json(dbGame);
        })
        .catch(function (err) {
            return res.json(err);
        });
}

exports.saveGame = function (req, res) {
    /*req.body syntax:
    {
        name: {name of game},
        numberWrongPermitted: {number of wrong answers before user loses},
        numberofQuestions: {number of total questions}
    }*/
    db.Game.create(req.body)
        .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.updateGame = function (req, res) {
    /*req.body syntax:
    {
        id: {id of game to be updated}
        name: {name of game},
        numberWrongPermitted: {number of wrong answers before user loses},
        numberofQuestions: {number of total questions}
    }*/
    db.Game.findOneAndUpdate({ _id: req.body.id },
        {
            $set: {
                question: req.body.question,
                numberWrongPermitted: req.body.numberWrongPermitted,
                numberofQuestions: req.body.numberofQuestions
            }
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

exports.deleteGame = function (req, res) {
    /*req.body syntax:
    {
        id: {id of game to be updated}
    }*/
    db.Game.findById(req.body.id, "questions")
        .then(function (result) {
            console.log("target questions:", result);
            result.questions.forEach(id => {
                db.Question.findByIdAndRemove(id)
                    .then(function (removed) {
                        console.log("removed question when deleting game:", removed);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
        })
        .then(function () {
            db.Game.findById(req.body.id, "scores")
                .then(function (result) {
                    console.log("target scores:", result);
                    result.scores.forEach(id => {
                        db.Score.findByIdAndRemove(id)
                            .then(function (removed) {
                                console.log("removed score when deleting game:", removed);
                            })
                            .catch(function (err) {
                                // If an error occurred, send it to the client
                                return res.json(err);
                            });
                    });
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        })
        .then(function () {
            db.Game.findByIdAndRemove(req.body.id).then(function (removed) {
                console.log("removed game:", removed);
                res.json(removed);
            });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        })
}


exports.getQuestionIDs = function (req, res) {
    /*req.body syntax:
    {
        id: {_id of game},
    }
    */
    db.Game.findById(req.body.id)
        .then(function (dbGame) {
            console.log("Question IDs:", dbGame.questions);
            res.json(dbGame.questions);
        })
        .catch(function (err) {
            return res.json(err);
        });
}


exports.getScoreIDs = function (req, res) {
    /*req.body syntax:
    {
        id: {_id of game},
    }
    */
   db.Game.findById(req.body.id)
       .then(function (dbGame) {
           console.log("Score IDs:", dbGame.scores);
           res.json(dbGame.scores);
       })
       .catch(function (err) {
           return res.json(err);
       });

}