
const userRoleSchema = require("../role/roleModel");

module.exports = {
    //Check user role exist or not
    checkUserRole : async(req, res, next)=>{
        const roleId = req.body.role_id || req.params.role_id;
        const userRole = await userRoleSchema.findById({_id : roleId});
        if(userRole){
            req.userRole = userRole;
            next();
        }else{
            return res.status(404).json({statusCode : 404, message : "User role not found"});
        }
    }

}