const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const schema = new Schema({
    nama: { type: String, default: '' },
    password: { type: String, default: '' },
    email: { type: String, default: '' },
    kabupaten: { type: String, default: '' },
    alamat: { type: String, default: '' },
    sewaItem: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

// generating a hash
schema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Generate JWT
// schema.methods.generateAuthToken = function() {
//     this.token = jwt.sign({ _id: this._id, userType: this.userType }, keys.jwtPrivateKey);
//     return this.token;
// };

module.exports = mongoose.model('User', schema);
