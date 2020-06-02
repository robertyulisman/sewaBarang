'use strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new mongoose.Schema({
    namaBarang: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Kategori', schema)