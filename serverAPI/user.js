const db = require('../models');


exports.getUserbyUsernamePass = function (req, res) {
    /*DELETE_ON_PRODUCTION
      req.query syntax:
    {
        username: {username of admin},
        password: {password of admin}
    }
    */
    db.Admin.findOne(req.query)
        .then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(function (err) {
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
                    db.Admin.findByIdAndUpdate(result._id, { users: newUsers },{ new: true })
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