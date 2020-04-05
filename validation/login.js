const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email tidak valid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'email harus diisi';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'password harus diisi';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
