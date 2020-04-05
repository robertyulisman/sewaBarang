const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.nama = !isEmpty(data.nama) ? data.nama : '';
    data.alamat = !isEmpty(data.alamat) ? data.alamat : '';
    data.kabupaten = !isEmpty(data.kabupaten) ? data.kabupaten : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'email tidak valid';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'masukkan email';
    }
    if (Validator.isEmpty(data.nama)) {
        errors.nama = 'nama tidak boleh kosong';
    }
    if (Validator.isEmpty(data.alamat)) {
        errors.alamat = 'alamat tidak boleh kosong';
    }
    if (Validator.isEmpty(data.kabupaten)) {
        errors.kabupaten = 'kabupaten tidak boleh kosong';
    }

    if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
        errors.password = 'password minimal 6 dan mak 30 angka';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'masukkan password';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
