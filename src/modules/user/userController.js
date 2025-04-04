const bcrypt = require("bcrypt");
const userServices = require("./userServices");
const jwt = require("../../helper/jwt");

module.exports = {
  //register user
  registser: async (req, res) => {
    try {
      const { firstname, lastname, username, email, userRole } = req.body;
      const userDetails = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: await bcrypt.hash(req.body.password, 10),
        userRole: userRole,
      };
      const result = await userServices.saveUser(userDetails);
      if (result) {
        return res
          .status(200)
          .json({ statusCode: 200, message: "User register succesfully" });
      } else {
        return res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },

  //login user
  login: async (req, res) => {
    try {
      const user = req.user;
      const comparePwd = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (comparePwd) {
        const token = await jwt.getAuthToken(user.id);
        return res.status(200).json({
          statusCode: 200,
          data: { authToken: token },
          message: "Login succesfully",
        });
      } else {
        return res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },

  //Get user profile
  getUserProfile: async (req, res) => {
    try {
      const user = req.userAuth;
      if (user) {
        return res.status(200).json({
          statusCode: 200,
          data: user,
          message: "Profile get succesfully",
        });
      } else {
        return res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },

  //Get user profile
  editUserProfile: async (req, res) => {
    try {
      const user = req.userAuth;
      const { firstname, lastname, username, userRole } = req.body;
      const userDetails = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        userRole: userRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await userServices.editUser(user._id, userDetails);
      if (result) {
        return res.status(200).json({
          statusCode: 200,
          data: result,
          message: "User edit succesfully",
        });
      } else {
        return res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },

  //Get All user list
  getAllUserist: async (req, res) => {
    try {
      const user = req.userAuth;
      const serach = req.query.search;
      if (user.userRole.roleName === "admin") {
        const getAllUserList = await userServices.getAllUser(serach);
        if (getAllUserList) {
          return res.status(200).json({
            statusCode: 200,
            data: getAllUserList,
            message: "User list get succesfully",
          });
        } else {
          return res.status(400).json({ statusCode: 400, message: "Failed" });
        }
      } else {
        return res.status(400).json({
          statusCode: 400,
          message: "You are not authorized to get all users details",
        });
      }
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },

  //Check User Access Mod
  checkUserAccesssMod: async (req, res) => {
    try {
      const user = req.userAuth;
      const checkAccessMod = await userServices.checkAccessMod(user._id);
      if (checkAccessMod[0].access_module_name.length > 0) {
        return res.status(200).json({
          statusCode: 200,
          data: checkAccessMod,
          message: "User access module list get succesfully",
        });
      } else {
        return res
          .status(400)
          .json({ statusCode: 400, message: "You can not access modules" });
      }
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },

  //Update many user with same data
  updateManyUserWithSameName: async (req, res) => {
    try {
      const { firstname, lastname, username, userRole } = req.body;
      const userDetails = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        userRole: userRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await userServices.editUserWithSameName(
        userDetails.lastname,
        userDetails
      );
      if (result) {
        return res.status(200).json({
          statusCode: 200,
          data: result,
          message: "User edit succesfully",
        });
      } else {
        return res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },

  //Update many user with different data
  updateManyUserWithDiffData: async (req, res) => {
    try {
      const updateUserDetails = req.body;
      const result = await userServices.editUserWithDiffData(updateUserDetails);
      if (result) {
        return res.status(200).json({
          statusCode: 200,
          data: result,
          message: "User edit succesfully",
        });
      } else {
        return res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },
};
