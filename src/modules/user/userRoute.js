var express = require("express");
var router = express.Router();
const userController = require("../user/userController");
const userMiddleware = require("./userMiddleware");
const userValidate = require("../user/userValidate");
const middleware = require("../../middleware");

//Register API Route
router.post(
  "/register",
  userValidate.createUser,
  userMiddleware.checkUserByEmailOrUsername,
  userMiddleware.checkUserRole,
  userController.registser
);

//Login API Route
router.post(
  "/login",
  userValidate.login,
  userMiddleware.checkUser,
  userController.login
);

//Get User Profile API Route
router.get(
  "/get-profile",
  middleware.authenticateUser,
  userController.getUserProfile
);

//Edit User Profile API Route
router.put(
  "/edit-profile",
  middleware.authenticateUser,
  userMiddleware.checkUserByEmailOrUsername,
  userMiddleware.checkUserRole,
  userController.editUserProfile
);

//Get All User API Route
router.get(
  "/get-all-user-list",
  middleware.authenticateUser,
  userController.getAllUserist
);

//Check User Access Module API Route
router.get(
  "/check-user-acces-mod",
  middleware.authenticateUser,
  userController.checkUserAccesssMod
);

//Update many user with same lastname API
router.put(
  "/update-many-user-name",
  middleware.authenticateUser,
  userMiddleware.checkUserLastname,
  userController.updateManyUserWithSameName
);

//Update many user with different data API
router.put(
  "/update-many-user-diff-data",
  middleware.authenticateUser,
  userController.updateManyUserWithDiffData
);

module.exports = router;
