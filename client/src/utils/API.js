import axios from "axios";

export default {
    //get all games 
    getGames: function() {
        return axios.get("/api/games");
    },
    //get game with id - to edit 
    editGame: function(id) {
        return axios.get("/api/games/" + id);
    },
    saveGameName: function(gameName) {
        return axios.post("/api/books", gameName);
    }
}