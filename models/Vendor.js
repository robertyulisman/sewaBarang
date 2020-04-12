const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    nama: { type: String, default: '' },
    email: { type: String, default: '' },
    gambar: { type: String, default: '' },
    provinsi: { type: String, default: '' },
    kabupaten: { type: String, default: '' },
    alamat: { type: String, default: '' },
});

module.exports = mongoose.model('Vendor', schema);
