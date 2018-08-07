const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

'use strict';

// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const UserSchema = new Schema({
    // `title` is required and of type String
    username: {
        type: String,
        required: true,
        unique: true
    },
    // `link` is required and of type String
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);


// Export the Article model
module.exports = User;
