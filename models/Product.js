const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    kategori: { type: String, default: '' },
    namaBarang: { type: String, default: '' },
    harga: { type: Number, default: 0 },
    gambarBarang: { type: String, default: '' },
    deskripsi: { type: String, default: '' },
});

module.exports = mongoose.model('Product', schema);
