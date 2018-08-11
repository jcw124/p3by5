import axios from "axios";

export default {
    adminLogin: function(cred){
        return axios.post('/api/admin/login',cred);
    },

    getAdminbyUsername: function (username) {
        return axios.get(`/api/get/admin/login?username=${username}`);
    },

    getAdmin: function (adminID) {
        return axios.get(`/api/get/admin/${adminID}`);
    },

    saveAdmin: function (username, password, email) {
        return axios.put('/api/admin', {
            username: username,
            password: password,
            email: email
        });
    },

    updateAdmin: function (id, username, password) {
        return axios.post('/api/admin', {
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

