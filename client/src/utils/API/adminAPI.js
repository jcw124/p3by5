import axios from "axios";

export default {
    getAdminbyUsernamePass: function (username, password){
        return axios.get(`/api/get/admin/login?username=${username}&password=${password}`);
    },

    getAdmin: function (adminID) {
        return axios.get(`/api/get/admin/${adminID}`);
    },

    saveAdmin: function (username, password) {
        return axios.put('/api/admin', {
            username: username,
            password: password
        });
    },

    updateAdmin: function (id, username, password) {
        return axios.post('/api/admin',{
            id: id,
            username: username,
            password: password
        });
    },

    deleteAdmin: function (adminID) {
        return axios.delete(`/api/delete/admin/${adminID}`);
    },

    getAllAdmins: function () {
        return axios.get('/api/get/admin');
    },

    getGamesbyAdminID: function (adminID) {
        return axios.get(`/api/admin/games/${adminID}`);
    },

    getUsersbyAdminID: function (adminID) {
        return axios.get(`/api/game/users/${adminID}`);
    }
};

