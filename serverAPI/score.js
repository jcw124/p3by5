const db = require('../models');

exports.getScores = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.query syntax:
    {
        game: {_id of associated game},
        user: {_id of associated user}
    }
    */
    let query = {};
    if (req.query.game) { query.game = req.query.game };
    if (req.query.user) { query.user = req.query.user };
    db.Score.find(query)
        .populate("user")
        .sort([["score.won", -1], ["score.numRight", -1], ["score.numWrong", 1], ["score.user.username", 1]])
        .then(function (dbScores) {
            // If we were able to successfully find an Headline with the given id, send it back to the client
            res.json(dbScores);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.saveScore = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.body syntax:
    {
        score: {score of game just completed}
        game: {_id of associated game},
        user: {_id of associated user}
    }
    */
    db.Score.create(req.body)
        .then(function (dbScore) {
            return db.Game.findOneAndUpdate({ _id: req.body.game }, { $push: { scores: dbScore._id } }, { new: true });
        })
        .then(function (dbGame) {
            // If we were able to successfully update a Game, send it back to the client
            res.json(dbGame);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
}

exports.deleteScore = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of score to be removed
    */
    let game;
    db.Score.findById(req.params.id)
        .then(function (dbScore) {
            game = dbScore.game;
            db.Game.findById(game, "scores")
                .then(function (result) {
                    const newScores = [];
                    result.scores.forEach(id => {
                        if (id == req.params.id) {
                            db.Score.findByIdAndRemove(id)
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    return res.json(err);
                                });;
                        }
                        else newScores.push(id);
                    });
                    db.Game.findByIdAndUpdate(game, { scores: newScores }, { new: true })
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