
const userAccessSchema = require("../access/accessModel");

module.exports = {
    //Check user Access details id exist or not
    checkUserAccessId : async(req, res, next)=>{
        const accessId = req.body.access_id || req.params.access_id;
        const userAccess = await userAccessSchema.findById({_id : accessId});
        if(userAccess){
            req.userAccess = userAccess;
            next();
        }else{
            return res.status(404).json({statusCode : 404, message : "User access id not found"});
        }
    }

}