const Access = require("../access/accessModel");
const UserRole = require("../role/roleModel");
const userSchema = require("../user/userModel");

module.exports = {
  //save user detail in db
  saveUser: async (userDetails) => {
    const save_user = await userSchema.create(userDetails);
    return save_user;
  },

  //Edit user details
  editUser: async (userId, userDetails) => {
    const edit_user = await userSchema.findByIdAndUpdate(
      userId,
      { $set: userDetails },
      { new: true }
    );
    return edit_user;
  },

  //get all user
  getAllUser: async () => {
    const getAllUser = await userSchema.aggregate([
      {
        $lookup: {
          from: "user_roles",
          localField: "userRole",
          foreignField: "_id",
          as: "user_info",
        },
      },
      {
        $lookup: {
          from: "access_modules",
          localField: "userRole",
          foreignField: "userRole",
          as: "acc_info",
        },
      },
      {
        $unwind: "$user_info",
      },
      {
        $project: {
          firstName: "$firstname",
          lastName: "$lastname",
          email: "$email",
          fullName: "$username",
          user_role: "$user_info.roleName",
          access_module_name: "$acc_info.moduleName",
          active_access_module: "$acc_info.active",
        },
      },
    ]);
    return getAllUser;
  },
};
