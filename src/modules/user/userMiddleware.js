const userSchema = require("../user/userModel");
const userRoleSchema = require("../role/roleModel");

module.exports = {
    //Check user exists or not
    checkUserByEmailOrUsername : async(req, res, next) => {
        const email = req.body.email;
        const user = await userSchema.findOne({$or : [{email : email}, {username : req.body.username}]});
        if(!user){
            req.user = user;
            next();
        }else{
            return res.status(400).json({statusCode : 400, message : "User already exists"});
        }
    },

    //Check user exist or not
    checkUser : async(req, res, next) => {
        const email = req.body.email;
        const user = await userSchema.findOne({email : email}, {password : 1});
        if(user){
            req.user = user;
            next();
        }else{
            return res.status(404).json({statusCode : 404, message : "User not found"});
        }
    },

    //Check user role
    checkUserRole : async(req, res, next)=>{
        const userRole = await userRoleSchema.findById({_id : req.body.userRole});
        if(userRole){
            req.userRole = userRole;
            next();
        }else{
            return res.status(404).json({statusCode : 404, message : "User role not found"});
        }
    }

}