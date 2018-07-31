import axios from "axios";

export default {
    getUser: function (userID) {
        return axios.get(`/api/get/user/${userID}`);
    },

    saveUser: function (adminID, username, password) {
        return axios.put('/api/user', {
            username: username,
            password: password,
            admin: adminID
        });
    },

    updateUser: function (id, username, password) {
        return axios.post('/api/user',{
            id: id,
            username: username,
            password: password
        });
    },

    deleteUser: function (userID) {
        return axios.delete(`/api/delete/user/${userID}`);
    }
};

