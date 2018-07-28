const db = require('../models');

exports.getGame = function (req, res) {
    /*req.body syntax:
    {
        id: {id of game},
    }
    */
    console.log(req.body);
    db.Game.findById(req.body.id)
        .populate("questions")
        .populate("scores")
        .then(function (dbQuestion) {
            console.log("Question:", dbQuestion);
            res.json(dbQuestion);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
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

exports.deleteGame = function (req, res) {

}


exports.getQuestionIDs = function (req, res) {

}


exports.getScoreIDs = function (req, res) {

}