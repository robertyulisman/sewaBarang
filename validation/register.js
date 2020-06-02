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
        errors.email = 'Email tidak valid';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Masukkan email';
    }
    if (Validator.isEmpty(data.nama)) {
        errors.nama = 'Nama tidak boleh kosong';
    }
    if (Validator.isEmpty(data.alamat)) {
        errors.alamat = 'Alamat tidak boleh kosong';
    }
    if (Validator.isEmpty(data.kabupaten)) {
        errors.kabupaten = 'Kabupaten tidak boleh kosong';
    }

    if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
        errors.password = 'Password minimal 6 dan mak 30 angka';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Masukkan password';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
