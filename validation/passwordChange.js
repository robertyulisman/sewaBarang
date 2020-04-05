const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePasswordChange(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password must be at least between 6 and 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords did not matched";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
