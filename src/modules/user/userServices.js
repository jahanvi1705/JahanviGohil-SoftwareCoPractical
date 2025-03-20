const userSchema = require("../user/userModel");

module.exports = {
    //save user detail in db
    saveUser : async(userDetails) => {
        const save_user = await userSchema.create(userDetails);
        return save_user;
    },

    //Edit user details
    editUser : async(userId, userDetails) =>{
        const edit_user = await userSchema.findByIdAndUpdate(
            userId,
            {$set : userDetails},
            {new : true}
        );
        return edit_user;
    },

    //get all user
    getAllUser : async() => {
        const getAllUser = await userSchema.find({},{firstname : 1, lastname : 1, username : 1, email : 1})
        .populate('userRole', 'roleName').populate({
            path : 'userRole',
            match : {roleName : 'user'},
            // select : 'roleName -_id'
        });
        return getAllUser;
    }
}