const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const QuestionSchema = new Schema({
    // `title` is required and of type String
    question: {
        type: String,
        required: true
    },
    possibleAnswers: {
        type: Array,
        required: true
    },
    // `link` is required and of type String
    correctAnswer: {
        type: String,
        required: true
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: "Game"
    }
});

// This creates our model from the above schema, using mongoose's model method
const Question = mongoose.model("Question", QuestionSchema);

module.exports= Question;