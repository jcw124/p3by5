import mongoose from "mongoose";

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ScoreSchema = new Schema({
    // `title` is required and of type String
    score: {
        type: Number,
        required: true
    },
    // `link` is required and of type String
    name: {
        type: String,
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
const Score = mongoose.model("Score", ScoreSchema);

export default Score;