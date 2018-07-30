const db = require('../models');

exports.getUser = function (req, res) {
    /*req.body syntax:
    {
        id: {_id of user}
    }
    */
    db.User.findById(req.body.id)
        .then(function (dbUser) {
            console.log("User:", dbUser);
            res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.saveUser = function (req, res) {
    /*req.body syntax:
    {
        username: {username of user},
        password: {password of user},
        admin: {_id of admin associated with user}
    }
    */
    db.User.create(req.body)
        .then(function (dbUser) {
            return db.Admin.findOneAndUpdate({ _id: req.params.admin }, { $push: { scores: dbUser._id } }, { new: true });
        })

        .then(function (dbAdmin) {
            // If we were able to successfully update an Admin, send it back to the client
            res.json("Updated Admin:", dbAdmin);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.updateUser = function (req, res) {
    /*req.body syntax:
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
        })
        .then(function (dbUser) {
            // If we were able to successfully update an Article, send it back to the client
            res.json("Updated User:", dbUser);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });
}

exports.deleteUser = function (req, res) {
    /*req.body syntax:
    {
        user: {_id of user we want to delete},
        admin: {_id of associated admin}
    }
    */
    const user = req.body.user, admin = req.body.admin;

    db.Admin.findById(admin, "users")
        .then(function (result) {
            const newUsers = [];
            console.log("target users:", result);
            result.users.forEach(id => {
                if (id == user) {
                    db.User.findByIdAndRemove(id)
                        .then(function (removed) {
                            console.log("Removed:", removed);
                        })
                        .catch(function (err) {
                            // If an error occurred, send it to the client
                            return res.json(err);
                        });;
                }
                else newUsers.push(id);
            });
            db.Admin.findByIdAndUpdate(admin, { users: newUsers })
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
        });;
}