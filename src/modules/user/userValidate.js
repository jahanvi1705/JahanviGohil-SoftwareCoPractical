const Validator = require("validatorjs");

//user create user validation
const createUser = async(req, res, next) => {
    const validationRule = {
        "firstname" : "required|string",
        "lastname" : "required|string",
        "username" : "required|string",
        "email" : "required|email",
        "password" : "required|string|min:8",
        "userRole" : "required|string"
    }
    const v = new Validator(req.body, validationRule);
    if(v.fails()){
        return res.status(400).json({statusCode : 400, message : v.errors.first('firstname') ||   v.errors.first('lastname') ||   v.errors.first('username') ||  v.errors.first('email') ||  v.errors.first('userRole')});
    }else{
        v.passes();
        next();
    }

}

//User login validation
const login = async(req, res, next) => {
    const validationRule = {
        "email" : "required",
        "password" : "required"
    }
    const v = new Validator(req.body, validationRule);
    if(v.fails()){
        return res.status(400).json({statusCode : 400, message : v.errors.first('email') ||  v.errors.first('password')});
    }else{
        v.passes();
        next();
    }

}

module.exports = {
    createUser,
    login
}