const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const AdminSchema = new Schema({
    // `title` is required and of type String
    username: {
        type: String,
        required: true
    },
    // `link` is required and of type String
    password: {
        type: String,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: "Game"
        }
    ],
});

// This creates our model from the above schema, using mongoose's model method
const Admin = mongoose.model("Admin", AdminSchema);

module.exports= Admin;