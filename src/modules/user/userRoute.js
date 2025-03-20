var express = require('express');
var router = express.Router();
const userController = require("../user/userController");
const userMiddleware = require('./userMiddleware');
const userValidate = require("../user/userValidate");
const middleware = require('../../middleware');

router.post("/register", userValidate.createUser, userMiddleware.checkUserByEmailOrUsername, userMiddleware.checkUserRole, userController.registser);

router.post("/login", userValidate.login, userMiddleware.checkUser, userController.login);

router.get("/get-profile", middleware.authenticateUser, userController.getUserProfile);

router.put("/edit-profile", middleware.authenticateUser, userMiddleware.checkUserByEmailOrUsername, userMiddleware.checkUserRole, userController.editUserProfile);

router.get("/get-all-user-list", middleware.authenticateUser, userController.getAllUserist);


module.exports = router;
