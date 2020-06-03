'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new mongoose.Schema({
    nama: {
        type: String,
    },
    subkategori: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Subkategori',
        },
    ],
});

module.exports = mongoose.model('Kategori', schema);
