const mongoose = require('mongoose');

const detail = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const data = mongoose.model("data", detail);

module.exports = data;