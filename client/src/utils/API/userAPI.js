import axios from "axios";

export default {
    getUserbyUsernamePass: function (username, password) {
        return axios.get(`/api/get/user/login?username=${username}&password=${password}`);
    },

    getUser: function (userID) {
        return axios.get(`/api/get/user/${userID}`);
    },

    saveUser: function (username, password, email, admin) {

        return axios.put('/api/user', {
            username: username,
            password: password,
            email: email,
            adminName: admin
        });
    },

    updateUser: function (id, username, password) {
        return axios.post('/api/user', {
            id: id,
            username: username,
            password: password
        });
    },

    deleteUser: function (userID) {
        return axios.delete(`/api/delete/user/${userID}`);
    }
};

