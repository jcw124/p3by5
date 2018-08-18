const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ScoreSchema = new Schema({
    // `title` is required and of type String
    score: {
        numRight: {
            type: Number,
            required: true
        },
        numWrong: {
            type: Number,
            required: true
        },
        won:{
            type: Boolean,
            required: true
        }
    },
    // `link` is required and of type String
    game: {
        type: Schema.Types.ObjectId,
        ref: "Game"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

// This creates our model from the above schema, using mongoose's model method
const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;