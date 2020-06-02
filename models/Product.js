const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    kategori: { type: String, default: '' },
    namaBarang: { type: String, default: '' },
    harga: { type: Number, default: 0 },
    jml_barang: {type: Number, default: 0 },
    alamat: {type: String, default: ''},
    kabupaten: {type: String, default: ''},
    provinsi: {type: String, default: ''},
    gambarBarang: { type: String, default: '' },
    deskripsi: { type: String, default: '' },
    jaminan: { type: String, default: '' },
});

module.exports = mongoose.model('Product', schema);
