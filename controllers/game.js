const db = require('../models');

exports.getGame = function (req, res) {
    /*
       req.params gives _id of user
   */
    db.Game.findById(req.params.id)
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
        admin: {_id of associated admin}
        
    }
    */
    db.Game.create(req.body)
        .then(function (dbGame) {
            return db.Admin.findOneAndUpdate({ _id: req.body.admin }, { $push: { games: dbGame._id } }, { new: true });
        })
        .then(function (dbAdmin) {
            // If we were able to successfully update a Game, send it back to the client
            res.json(dbAdmin);
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
    db.Game.findByIdAndUpdate(req.body.id,
        {
            question: req.body.question,
            numberWrongPermitted: req.body.numberWrongPermitted,
            numberofQuestions: req.body.numberofQuestions
        }, { new: true })
        .then(function (dbGame) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbGame);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.deleteGame = function (req, res) {
    /*
        req.params gives _id of game to be removed
    */
    let admin;
    db.Game.findById(req.params.id)
        .then(function (dbGame) {
            admin = dbGame.admin;
            console.log("target game:", dbGame);
            dbGame.questions.forEach(id => {
                db.Question.findByIdAndRemove(id)
                    .then(function (removed) {
                        console.log("removed question when deleting game:", removed);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
            dbGame.scores.forEach(id => {
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
        .then(function () {
            db.Admin.findById(admin, "games")
                .then(function (dbAdmin) {
                    const newGames = [];
                    console.log("target games:", dbAdmin);
                    dbAdmin.games.forEach(id => {
                        if (id == req.params.id) {
                            db.Game.findByIdAndRemove(id)
                                .then(function (removed) {
                                    console.log("Removed:", removed);
                                })
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    return res.json(err);
                                });;
                        }
                        else newGames.push(id);
                    });
                    db.Admin.findByIdAndUpdate(admin, { games: newGames }, { new: true })
                        .then(function (dbAdmin) {
                            console.log("Updated Admin:", dbAdmin);
                            res.json(dbAdmin);
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


exports.getQuestionIDs = function (req, res) {
    /*
        req.params gives _id of associated game
    */
    db.Game.findById(req.params.id, "questions")
        .then(function (dbGame) {
            console.log("Question IDs:", dbGame.questions);
            res.json(dbGame.questions);
        })
        .catch(function (err) {
            return res.json(err);
        });
}


exports.getScoreIDs = function (req, res) {
    /*
        req.params gives _id of associated game
    */
    db.Game.findById(req.body.id, "scores")
        .then(function (dbGame) {
            console.log("Score IDs:", dbGame.scores);
            res.json(dbGame.scores);
        })
        .catch(function (err) {
            return res.json(err);
        });

}