const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema(
    {
        time: Number,
        description: []
    }
);