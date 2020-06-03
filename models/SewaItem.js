const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    namaPemesan: { type: String },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },

    tanggalAwal: { type: String },
    tanggalAkhir: { type: String },
    jumlahHari: { type: String },
    total: { type: Number },
    statusPemesanan: { type: String, default: 'Belum dikonfirmasi' },
});

module.exports = mongoose.model('SewaItem', schema);
