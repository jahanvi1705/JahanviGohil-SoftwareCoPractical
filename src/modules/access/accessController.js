const accessService = require("../access/accessService");
const userAccessService = require("../access/accessService");

module.exports = {
    //Add user access details
    addAccessModuleDetails : async(req, res) => {
        try{
            const {moduleName, active, userRole} = req.body;
            const userAccessDetails = {
                moduleName : moduleName,
                active : active,
                userRole : userRole
            }
            const result = await userAccessService.saveUserAccessDetails(userAccessDetails);
            if(result){
                return res.status(200).json({statusCode : 200, message : "User acess details add succesfully"});
            }else{
                return res.status(400).json({statusCode : 400, message : "Failed"});
            }
        }catch(error){
            return res.status(500).json({statusCode : 500, message : error.message});
        }
    },

    //Get User Access details by id
    getUserAccessListByAccessId : async(req, res) => {
        try{
            const getUserAccess = await accessService.getUserAccessById(req.params.access_id);
            if(getUserAccess){
                return res.status(200).json({statusCode : 200, data : getUserAccess, message : "User aceess detaiils get succesfully"});
            }else{
                return res.status(400).json({statusCode : 400, message : "Failed"});
            }
        }catch(error){
            return res.status(500).json({statusCode : 500, message : error.message});
        }
    },

    //Edit user Access details
    editUserAccessDetails : async(req, res)=>{
        try{
            const userAccess = req.userAccess;
            const {moduleName, active, userRole} = req.body;
            const userAccessDetails = {
                moduleName : moduleName,
                active : active,
                userRole : userRole,
                updatedAt : new Date()
            }
            const result = await accessService.editUserAccessDetails(userAccess._id, userAccessDetails);
            if(result){
                return res.status(200).json({statusCode : 200, data: result, message : "User access details edit succesfully"});
            }else{
                return res.status(400).json({statusCode : 400, message : "Failed"});
            }   
        }catch(error){
            return res.status(500).json({statusCode : 500, message : error.message});
        }
        
    },

    //Delete User Access Mod detail
    deleteUserAccessModDetail : async(req, res, next) =>{
        try{
            const result = await accessService.deleteUserAccessModeDt(req.params.access_id);
            if(result){
                return res.status(200).json({statusCode : 200, message : "Access module details delete succesfully"});
            }else{
                return res.status(400).json({statusCode : 400, message : "Failed"});
            }  
            }catch(error){
            return res.status(500).json({statusCode : 500, message : error.message});
        }
    },

    //get all user access details 
    getAllUserAccessModuleList : async(req, res) => {
        try{
            const getUserRole = await accessService.getAllUserAccessDetail();
            if(getUserRole){
                return res.status(200).json({statusCode : 200, data : getUserRole, message : "All user's access details get succesfully"});
            }else{
                return res.status(400).json({statusCode : 400, message : "Failed"});
            }
        }catch(error){
            return res.status(500).json({statusCode : 500, message : error.message});
        }
    },
}