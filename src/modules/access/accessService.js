const userAccessSchema = require("../access/accessModel");

module.exports = {
    //save user access detail in db
    saveUserAccessDetails : async(userAccessDetails) => {
        const save_userAccess = await userAccessSchema.create(userAccessDetails);
        return save_userAccess;
    },

    //get all user acccess details by accessId
    getUserAccessById : async(acessId) => {
        const getUserAccess = await userAccessSchema.findById({_id : acessId});
        return getUserAccess;
    },

    //Edit user access details 
    editUserAccessDetails : async(accessId, userAccessDetails) => {
        const edit_userAccDet = await userAccessSchema.findByIdAndUpdate(
            accessId,
            {$set : userAccessDetails},
            {new : true}
        );
        return edit_userAccDet;
    },

    //Delete user access dt
    deleteUserAccessModeDt : async(accessId) => {
        const deleteRole = await userAccessSchema.findByIdAndDelete(accessId);
        return deleteRole;
    },

    //get all user access details
    getAllUserAccessDetail : async() => {
        const getAllUserAccessDt = await userAccessSchema.find({},{moduleName : 1, active: 1, createdAt : 1, updatedAt : 1})
        .where('active').equals(true)
        .populate('userRole');
        return getAllUserAccessDt;
    },

}