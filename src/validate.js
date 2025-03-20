const Validator = require("validatorjs");
const validator = (body, rules, customMessage, callback) => {
    const validation = new Validator(body, rules, customMessage);
    validation.passes(()=> callback(null, true)); //validation true
    validation.fails(()=> callback(validation.errors, false)); //validation false
}

module.exports = validator;