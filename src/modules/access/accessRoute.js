var express = require('express');
var router = express.Router();
const middleware = require('../../middleware');
const accessModValidate = require("../access/accessValidate");
const accessController = require("../access/accessController");
const userMiddleware = require("../user/userMiddleware");
const userAccessMiddleware = require("../access/accessMiddleware");

router.post("/add-access-mod-details", middleware.authenticateUser, accessModValidate.addUserAccessValidate, userMiddleware.checkUserRole, accessController.addAccessModuleDetails);

router.get("/get-user-access-details-by-id/:access_id", middleware.authenticateUser, userAccessMiddleware.checkUserAccessId, accessController.getUserAccessListByAccessId);

router.put("/edit-user-access-details", accessModValidate.editUserAccessValidate, middleware.authenticateUser, userMiddleware.checkUserRole, userAccessMiddleware.checkUserAccessId, accessController.editUserAccessDetails);

router.delete("/delete-user-access-details/:access_id", middleware.authenticateUser, userAccessMiddleware.checkUserAccessId, accessController.deleteUserAccessModDetail);

router.get("/get-all-user-access-mod-list", middleware.authenticateUser, accessController.getAllUserAccessModuleList);

module.exports = router;