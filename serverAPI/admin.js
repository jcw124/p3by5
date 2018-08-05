const db = require('../models');

exports.getAdminbyUsernamePass = function (req, res) {
    /*DELETE_ON_PRODUCTION
    req.query syntax:
    {
        username: {username of admin},
        password: {password of admin}
    }
    */
    db.Admin.findOne(req.query)
        .populate("users")
        .populate("games")
        .then(function (dbAdmin) {
            res.json(dbAdmin);
        })
        .catch(function (err) {
            return res.json(err);
        });
}

exports.getAdmin = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of admin
    */
    db.Admin.findById(req.params.id)
        .populate("users")
        .populate("games")
        .then(function (dbAdmin) {
            res.json(dbAdmin);
        })
        .catch(function (err) {
            return res.json(err);
        });
}

exports.saveAdmin = function (req, res) {
    /*DELETE_ON_PRODUCTION
    req.body syntax:
    {
        username: {username of admin},
        password: {password of admin}
    }
    */
    db.Admin.create(req.body)
        .then(function (dbAdmin) {
            // If we were able to successfully update a Game, send it back to the client
            res.json(dbAdmin);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}


exports.updateAdmin = function (req, res) {
    /*DELETE_ON_PRODUCTION
    req.body syntax:
    {
        id: {_id of game to be updated}
        username: {username of admin},
        password: {password of admin}
        
    }*/
    db.Admin.findByIdAndUpdate(req.body.id,
        {
            username: req.body.username,
            password: req.body.password
        }, { new: true })
        .then(function (dbAdmin) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbAdmin);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}


exports.deleteAdmin = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of admin
    */

    //first finds the admin, the deletes all users and games associated.  
    //for games, finds all questions and scores associated and deletes them too.
    //finally, deletes the admin document.
    db.Admin.findById(req.params.id, "users games")
        .then(function (dbAdmin) {
            dbAdmin.users.forEach(id => {
                db.User.findByIdAndRemove(id)
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
            dbAdmin.games.forEach(id => {
                db.Game.findByIdAndRemove(id)
                    .then(function (dbGame) {
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
                    });
            })
        })
        .then(function () {
            db.Admin.findByIdAndRemove(req.params.id)
                .then(function (removed) {
                    res.json(removed);
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

exports.getAllAdmins = function (req, res) {
    db.Admin.find({})
        .populate("users")
        .populate("games")
        .then(function (dbAdmins) {
            res.json(dbAdmins);
        })
        .catch(function (err) {
            return res.json(err);
        });
}



exports.getGamesbyAdminID = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of associated admin
    */
    db.Game.find({ admin: req.params.id })
        .then(function (dbGames) {
            res.json(dbGames);
        })
        .catch(function (err) {
        });
}


exports.getUsersbyAdminID = function (req, res) {
    /*DELETE_ON_PRODUCTION
        req.params gives _id of associated admin
    */
    db.User.find({ admin: req.params.id })
        .then(function (dbUsers) {
            res.json(dbUsers);
        })
        .catch(function (err) {
            return res.json(err);
        });

}