import axios from "axios";

export default {
    getQuestion: function (questionID) {
        return axios.get(`/api/get/question/${questionID}`);
    },

    saveQuestion: function (question, possibleAnswers, correctAnswer, gameID) {
        return axios.put('/api/question', {
            question: question,
            possibleAnswers: possibleAnswers,
            correctAnswer: correctAnswer,
            game: gameID
        });
    },

    updateQuestion: function (questionID, question, possibleAnswers, correctAnswer) {
        return axios.post('/api/question', {
            id: questionID,
            question: question,
            possibleAnswers: possibleAnswers,
            correctAnswer: correctAnswer
        });
    },

    deleteQuestion: function (questionID) {
        return axios.delete(`/api/delete/question/${questionID}`);
    }
};

