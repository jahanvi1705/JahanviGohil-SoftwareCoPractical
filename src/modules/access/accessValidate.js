const Validator = require("validatorjs");

//user create user access validation
const addUserAccessValidate = async(req, res, next) => {
    const validationRule = {
        "moduleName" : "required|string",
        "userRole" : "required|string"
    }
    const v = new Validator(req.body, validationRule);
    if(v.fails()){
        return res.status(400).json({statusCode : 400, message : v.errors.first('moduleName') ||  v.errors.first('userRole')});
    }else{
        v.passes();
        next();
    }

}

//edit user access validation
const editUserAccessValidate = async(req, res, next) => {
    const validationRule = {
        "access_id" : "required|string"
    }
    const v = new Validator(req.body, validationRule);
    if(v.fails()){
        return res.status(400).json({statusCode : 400, message : v.errors.first('access_id')});
    }else{
        v.passes();
        next();
    }
}

module.exports = {
    addUserAccessValidate,
    editUserAccessValidate

}