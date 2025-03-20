var express = require('express');
var router = express.Router();
const middleware = require('../../middleware');
const roleController = require('./roleController');
const roleValidate = require("../role/roleValidate");
const roleMidleware = require("../role/roleMiddleware");

router.post("/create-user-role", roleValidate.createUserRole, roleController.createUserRole);

router.get("/get-user-role-list", middleware.authenticateUser, roleController.getUserRoleList);

router.get("/get-user-role-list-by-role/:role_id", middleware.authenticateUser, roleMidleware.checkUserRole, roleController.getUserRoleListByRoleId);

router.put("/edit-user-role-details", roleValidate.editUserAccessValidate, middleware.authenticateUser, roleMidleware.checkUserRole, roleController.editUserRole);

router.delete("/delete-user-role/:role_id", middleware.authenticateUser, roleMidleware.checkUserRole, roleController.deleteUserRole);

module.exports = router;
