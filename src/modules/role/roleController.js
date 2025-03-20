const roleService = require("./roleService");

module.exports = {
    //create user role
    createUserRole : async(req, res) => {
        try{
            const roleDetails = {
                roleName : req.body.roleName
            }
            const result = await roleService.saveUserRole(roleDetails);
            if(result){
                return res.status(200).json({statusCode : 200, message : "User role create succesfully"});
            }else{
                return res.status(400).json({statusCode : 400, message : "Failed"});
            }
        }catch(error){
            return res.status(500).json({statusCode : 500, message : error.message});
        }
    },

    //get user role
    getUserRoleList : async(req, res) => {
        try{
            const getUserRole = await roleService.getUserRole();
            if(getUserRole){
                return res.status(200).json({statusCode : 200, data : getUserRole, message : "User role get succesfully"});
            }else{
                return res.status(400).json({statusCode : 400, message : "Failed"});
            }
        }catch(error){
            return res.status(500).json({statusCode : 500, message : error.message});
        }
    }
}