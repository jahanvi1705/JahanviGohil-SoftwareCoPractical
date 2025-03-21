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

  //get all user and search record based on usrename
  getAllUser: async (search) => {
    //Check search filter
    let matchCondition = {};
    if (search != undefined) {
      matchCondition = search;
    }
    const getAllUser = await userSchema.aggregate([
      {
        $match: {
          username: { $regex: `${matchCondition}`, $options: "i" },
        },
      },
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

  //Check user access mod
  checkAccessMod: async (userId) => {
    console.log(userId);

    const getAllUser = await userSchema.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
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

  //Edit user with same name
  editUserWithSameName: async (lastname, userDetails) => {
    const edit_user = await userSchema.updateMany(
      { lastname: lastname },
      { $set: userDetails },
      { new: true }
    );
    return edit_user;
  },

  //Edit user with same name
  editUserWithDiffData: async (updateUserDetails) => {
    const bulkEditRecord = updateUserDetails.map((userData) => ({
      updateOne: {
        filter: {
          _id: userData.user_id,
        },
        update: { $set: userData },
      },
    }));
    const result = await userSchema.bulkWrite(bulkEditRecord);
    return result;
  },
};
