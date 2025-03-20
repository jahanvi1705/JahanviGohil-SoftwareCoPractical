const Validator = require("validatorjs");

//user create userRole validation
const createUserRole = async(req, res, next) => {
    const validationRule = {
        "roleName" : "required|string"
    }
    const v = new Validator(req.body, validationRule);
    if(v.fails()){
        return res.status(400).json({statusCode : 400, message : v.errors.first('roleName')});
    }else{
        v.passes();
        next();
    }
}

module.exports = {
    createUserRole
}