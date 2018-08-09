const db = require('../models');

exports.getUserbyUsernamePass = function (req, res) {
    var newuser = new db.User();
    db.User.findOne({username: req.query.username})
        .then(function (dbUser) {
            if(newuser.validPassword(req.query.password, dbUser.password))
            {
                console.log("FUCKING AUTHENTICATED");
                return res.json(dbUser);
            }
            return res.json(null);
        })
        .catch(function (err) {
            console.log(err);
            return res.json(err);
        });
}

exports.getUser = function (req, res) {
    /*DELETE_ON_PRODUCTION
    req.params gives _id of user
    */
    db.User.findById(req.params.id)
        .then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.saveUser = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.body syntax:
    {
        username: {username of user},
        password: {password of user},
        admin: {_id of admin associated with user}
    }
    */
   var newuser = new db.User();
    console.log("made it to the user.js");
    console.log(req.body);
    req.body.password = newuser.generateHash(req.body.password);
    console.log(req.body);

    db.User.create(req.body)
        .then(function (dbUser) {
            return db.Admin.findByIdAndUpdate(req.body.admin, { $push: { users: dbUser._id } }, { new: true });
        })
        .then(function (dbAdmin) {
            // If we were able to successfully update an Admin, send it back to the client
            res.json(dbAdmin);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.updateUser = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.body syntax:
        {
            id: {_id of question to be updated}
            username: {new username of user}
            password: {new password of user}
        }
        */
    db.User.findByIdAndUpdate(req.body.id,
        {
            username: req.body.username,
            password: req.body.password
        }, { new: true })
        .then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.deleteUser = function (req, res) {
    /*DELETE_ON_PRODUCTION
    req.params gives _id of user to be removed
    */

    db.User.findById(req.params.id)
        .then(function (dbUser) {
            db.Admin.findById(dbUser.admin)
                .then(function (result) {
                    const newUsers = [];
                    result.users.forEach(id => {
                        if (id == req.params.id) {
                            db.User.findByIdAndRemove(id)
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    return res.json(err);
                                });;
                        }
                        else newUsers.push(id);
                    });
                    db.Admin.findByIdAndUpdate(result._id, { users: newUsers }, { new: true })
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