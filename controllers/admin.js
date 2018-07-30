const db = require('../models');
const deleteGame = require("./game").deleteGame;

exports.getAdmin = function (req, res) {
    /*req.body syntax:
    {
        id: {_id of admin},
    }
    */
    db.Admin.findById(req.body.id)
        .populate("users")
        .populate("games")
        .then(function (dbAdmin) {
            console.log("Admin:", dbAdmin);
            res.json(dbAdmin);
        })
        .catch(function (err) {
            return res.json(err);
        });
}

exports.saveAdmin = function (req, res) {
    /*req.body syntax:
    {
        username: {username of admin},
        password: {password of admin}
    }
    */
    db.Admin.create(req.body)
        .then(function (dbAdmin) {
            // If we were able to successfully update a Game, send it back to the client
            res.json("New Admin:", dbAdmin);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}


exports.updateAdmin = function (req, res) {
    /*req.body syntax:
    {
        id: {id of game to be updated}
        username: {username of admin},
        password: {password of admin}
        
    }*/
    db.Admin.findByIdAndUpdate(req.body.id,
        {
            username: req.body.username,
            password: req.body.password
        })
        .then(function (dbAdmin) {
            // If we were able to successfully update an Article, send it back to the client
            res.json("Updated Admin:", dbAdmin);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}


exports.deleteAdmin = function (req, res) {
    /*req.body syntax:
     {
         id: {_id of admin associated with game}
     }*/
    db.Admin.findById(req.body.id, "users games")
        .then(function (dbAdmin) {
            console.log("target admin:", dbAdmin);
            dbAdmin.users.forEach(id => {
                db.Users.findByIdAndRemove(id)
                    .then(function (removed) {
                        console.log("removed user when deleting admin:", removed);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
            dbGame.games.forEach(id => {
                deleteGame({
                    game: id
                    admin: req.body.id
                }, res);
            });
        })
        .then(function () {
            db.Admin.findByIdAndRemove(req.body.id)
                .then(function (removed) {
                    console.log("Removed Admin:", removed);
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