const userRoleSchema = require("../role/roleModel");

module.exports = {
    saveUserRole : async(userRoleDetails) => {
        const save_userRole = await userRoleSchema.create(userRoleDetails);
        return save_userRole;
    },

    //get all user role
    getUserRole : async() => {
        const getUserRole = await userRoleSchema.find();
        return getUserRole;
    },

    //get all user role by roleId
    getUserRoleById : async(roleId) => {
        const getUserRole = await userRoleSchema.findById({_id : roleId});
        return getUserRole;
    },

    //Edit user role details 
    editUserRoleDetails : async(roleId, roleDetails) => {
        const edit_userRole = await userRoleSchema.findByIdAndUpdate(
            roleId,
            {$set : roleDetails},
            {new : true}
        );
        return edit_userRole;
    },

    //Delete user role
    deleteUserRole : async(roleId) => {
        const deleteRole = await userRoleSchema.findByIdAndDelete(roleId);
        return deleteRole;
    }
}