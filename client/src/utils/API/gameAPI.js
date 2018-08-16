import axios from "axios";

export default {
    getGame: function (gameID) {
        console.log(gameID);
        return axios.get(`/api/get/game/${gameID}`);
    },

    saveGame: function (name, numberWrongPermitted, numberofQuestions, adminID) {
        console.log("saving game");
        return axios.put('/api/game', {
            name: name,
            numberWrongPermitted: numberWrongPermitted,
            numberofQuestions: numberofQuestions,
            admin: adminID
        });
    },

    updateGame: function (gameID, numberWrongPermitted, numberofQuestions) {
        return axios.post('/api/game',{
            id: gameID,
            numberWrongPermitted: numberWrongPermitted,
            numberofQuestions: numberofQuestions
        });
    },

    deleteGame: function (gameID) {
        return axios.delete(`/api/delete/game/${gameID}`);
    },
    
    getQuestionsbyGameID: function (gameID) {
        return axios.get(`/api/game/questions/${gameID}`);
    },

    getScoresbyGameID: function (gameID) {
        return axios.get(`/api/game/scores/${gameID}`);
    }
};

