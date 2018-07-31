const db = require('../models');

exports.getScores = function (req, res) {
    /*req.query syntax:
    {
        game: {_id of associated game},
        user: {_id of associated user}
    }
    */
    console.log(req.body);
    db.Score.find({
        game: req.query.game,
        user: req.query.user
    }, "score name")
        .sort({ score: -1 })
        .then(function (dbScores) {
            // If we were able to successfully find an Headline with the given id, send it back to the client
            console.log("Scores:", dbScores);
            res.json(dbScores);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.saveScore = function (req, res) {
    /*req.body syntax:
    {
        score: {score of game just completed}
        name: {name of user associated with given score},
        game: {_id of associated game},
        user: {_id of associated user}
    }
    */
    db.Score.create(req.body)
        .then(function (dbScore) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
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
    /*
        req.params gives _id of score to be removed
    */
    let game;
    db.Score.findById(req.params.id)
        .then(function (dbScore) {
            game = dbScore.game;
            db.Game.findById(game, "scores")
                .then(function (result) {
                    const newScores = [];
                    console.log("target scores:", result);
                    result.scores.forEach(id => {
                        if (id == req.params.id) {
                            db.Score.findByIdAndRemove(id)
                                .then(function (removed) {
                                    console.log("Removed:", removed);
                                })
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    return res.json(err);
                                });;
                        }
                        else newScores.push(id);
                    });
                    console.log("New Scores Array:", newScores);
                    db.Game.findByIdAndUpdate(game, { scores: newScores }, { new: true })
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