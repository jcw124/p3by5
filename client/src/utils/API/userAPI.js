import axios from "axios";

export default {
    getUserbyUsernamePass: function (username, password) {
        return axios.get(`/api/get/users/login?username=${username}&password=${password}`);
    },

    getUser: function (userID) {
        return axios.get(`/api/get/users/${userID}`);
    },

    saveUser: function (adminID, username, password) {
        return axios.put('/api/users', {
            username: username,
            password: password,
            admin: adminID
        });
    },

    updateUser: function (id, username, password) {
        return axios.post('/api/users', {
            id: id,
            username: username,
            password: password
        });
    },

    deleteUser: function (userID) {
        return axios.delete(`/api/delete/users/${userID}`);
    }
};

