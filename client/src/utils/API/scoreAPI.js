import axios from "axios";

export default {
    getScore: function (gameID, userID) {
        let url = `/api/get/score?game=${gameID}`;
        if (userID) { url += `&user=${userID}` }
        return axios.get(url);
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

