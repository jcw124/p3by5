import axios from "axios";

export default {
    getScore: function (gameID, userID) {
        return axios.get(`/api/get/score?game=${gameID}&user=${userID}`);
    },

    saveScore: function (score, name, gameID, userID) {
        return axios.put('/api/score', {
            score: score,
            name: name,
            game: gameID,
            user: userID
        });
    },

    deleteScore: function (scoreID) {
        return axios.delete(`/api/delete/score/${scoreID}`);
    }
};

