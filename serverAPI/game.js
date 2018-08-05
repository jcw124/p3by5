const db = require('../models');

exports.getGame = function (req, res) {
    /*DELETE_ON_PRODUCTION
       req.params gives _id of user
   */
    db.Game.findById(req.params.id)
        .populate("questions")
        .populate("scores")
        .then(function (dbGame) {
            res.json(dbGame);
        })
        .catch(function (err) {
            return res.json(err);
        });
}

exports.saveGame = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.body syntax:
    {
        name: {name of game},
        numberWrongPermitted: {number of wrong answers before user loses},
        numberofQuestions: {number of total questions}
        admin: {_id of associated admin}
        
    }
    */
    let newGame;
    db.Game.create(req.body)
        .then(function (dbGame) {
            newGame=dbGame;
            return db.Admin.findOneAndUpdate({ _id: req.body.admin }, { $push: { games: dbGame._id } }, { new: true });
        })
        .then(function(){
            res.json(newGame);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.updateGame = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.body syntax:
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
    /*DELETE_ON_PRODUCTION
        req.params gives _id of game to be removed
    */
    let admin;

    //find the game with associated _id.
    //iterate through associated questions and scores and delete them.
    //finally, remove game from associated admin and delete game document.
    db.Game.findById(req.params.id)
        .then(function (dbGame) {
            admin = dbGame.admin;
            dbGame.questions.forEach(id => {
                db.Question.findByIdAndRemove(id)
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
            dbGame.scores.forEach(id => {
                db.Score.findByIdAndRemove(id)
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
                    dbAdmin.games.forEach(id => {
                        if (id == req.params.id) {
                            db.Game.findByIdAndRemove(id)
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    return res.json(err);
                                });;
                        }
                        else newGames.push(id);
                    });
                    db.Admin.findByIdAndUpdate(admin, { games: newGames }, { new: true })
                        .then(function (dbAdmin) {
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


exports.getQuestionsbyGameID = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of associated game
    */
    db.Question.find({ game: req.params.id })
        .then(function (dbQuestions) {
            res.json(dbQuestions);
        })
        .catch(function (err) {
            return res.json(err);
        });
}


exports.getScoresbyGameID = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of associated game
    */
    db.Score.find({ game: req.params.id })
        .then(function (dbScores) {
            res.json(dbScores);
        })
        .catch(function (err) {
            return res.json(err);
        });

}