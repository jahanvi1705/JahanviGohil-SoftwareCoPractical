var express = require('express');
var router = express.Router();
const middleware = require('../../middleware');
const roleController = require('./roleController');
const roleValidate = require("../role/roleValidate");

router.post("/create-user-role", roleValidate.createUserRole, middleware.authenticateUser, roleController.createUserRole);

router.get("/get-user-role-list", middleware.authenticateUser, roleController.getUserRoleList);

module.exports = router;
