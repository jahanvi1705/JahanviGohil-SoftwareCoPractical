const lodash = require("lodash");
const Jwt = require("../src/helper/jwt");
const userSchema = require("../src/modules/user/userModel");

module.exports = {
    //check user authentication
    authenticateUser : async(req, res, next) => {
        if(req.headers.authorization && !lodash.isEmpty(req.headers.authorization)){
            const tokenInfo = await Jwt.decodeAuthToken(req.headers.authorization.toString());
            if(tokenInfo){
                const user = await userSchema.findById({_id : tokenInfo.data}, {_id : 1, firstname : 1, lastname: 1, username : 1, email : 1, createdAt : 1, updatedAt : 1}).populate('userRole', 'roleName');
                if(user){
                    req.userAuth = user;
                    next();
                }else{
                    return res.status(401).json({statusCode : 401, message : "Unauthorized"});
                } 
            }else{
                return res.status(401).json({statusCode : 401, message : "Unauthorized"});
            }
        }else{
            return res.status(401).json({statusCode : 401, message : "Unauthorized"});
        }
    }

}
