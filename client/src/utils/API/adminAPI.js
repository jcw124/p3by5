import axios from "axios";

export default {
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
    }
};

