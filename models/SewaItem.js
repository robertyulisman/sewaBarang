const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },

    jumlah: { type: Number, default: 0 },
});

module.exports = mongoose.model('SewaItem', schema);
