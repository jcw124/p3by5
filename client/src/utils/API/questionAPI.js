import axios from "axios";

export default {
    getQuestion: function (questionID) {
        return axios.get(`/api/get/question/${questionID}`);
    },

    saveQuestion: function (name, possibleAnswers, correctAnswer, gameID) {
        return axios.put('/api/question', {
            name: name,
            possibleAnswers: possibleAnswers,
            correctAnswer: correctAnswer,
            game: gameID
        });
    },

    updateQuestion: function (questionID, name, possibleAnswers, correctAnswer) {
        return axios.post('/api/question',{
            id: questionID,
            name: name,
            possibleAnswers: possibleAnswers,
            correctAnswer: correctAnswer
        });
    },

    deleteQuestion: function (questionID) {
        return axios.delete(`/api/delete/question/${questionID}`);
    }
};

