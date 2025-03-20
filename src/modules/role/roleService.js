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
    }
}